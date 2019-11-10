const XLSX = require('xlsx');
const sanitize = require("sanitize-filename");
const changeCase = require('change-case');
const diacritics = require('diacritics');
const fs = require('fs');


const SOURCE_FILE = `${__dirname}/supporters.xlsx`;
const DEST_FOLDER = `${__dirname}/../_supporters`;
const COUNTRY_CODES_FILE = `${__dirname}/country-codes.xlsx`;

const CATEGORIES = {
    'Etat'          : 'state',
    'Secteur privé' : 'private-sector',
    'Société civile': 'civil-society',
    'Secteur public': 'public-authority',
};

function getCountryCodes() {
    const countryCodesXLSX = XLSX.readFile(COUNTRY_CODES_FILE);
    const countryCodes = XLSX.utils.sheet_to_json(countryCodesXLSX.Sheets[countryCodesXLSX.SheetNames[0]]);

    return countryCodes.reduce((result, countryEntry) => {
        result[countryEntry['usual-fr']] = countryEntry['ISO-3166-1-alpha-3'];
        return result;
    }, {});
}

const COUNTRY_CODES = getCountryCodes();

const EMAIL_REGEXP = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/i;


function normalizeSupporter(supporter) {
    if (! CATEGORIES[supporter.Catégorie]) {
        console.log(`Missing catégorie for ${ supporter.Nom }`);
    }

    if (! supporter.Nature && CATEGORIES[supporter.Catégorie] != 'state') {
        console.log(`Missing nature for ${ supporter.Nom }`);
    }

    if (CATEGORIES[supporter.Catégorie] == 'state') {
        supporter.nationality = supporter.name;  // for countries, we will use only their nationality as it is localised
    }

    supporter.Nationalité = (supporter['Pays - FRA'] || '').trim();
    supporter.Nationalité = COUNTRY_CODES[supporter.Nationalité] || '';

    if (! supporter.Nationalité) {
        console.log(`Missing nationality for ${ supporter.Nom }`);
    }

    supporter.Nom = supporter.Nom.trim();
    supporter.Catégorie = CATEGORIES[supporter.Catégorie];

    supporter.email = EMAIL_REGEXP.exec(supporter['Point de contact']);

    if (! supporter.email) {
        console.log(`Missing email for ${ supporter.Nom } (raw: ${supporter['Point de contact']})`);
        supporter.email = '';
    } else {
        supporter.email = supporter.email[0];
    }

    return supporter;
}

function generateContent(normalizedSupporter) {
    return `---
name: "${ normalizedSupporter.Nom }"
category: ${ normalizedSupporter.Catégorie }
nature: "${ normalizedSupporter.Nature || '' }"
nationality: ${ normalizedSupporter.Nationalité }
---
`;
}

const supportersXLSX = XLSX.readFile(SOURCE_FILE);  // this source file contains private data, it is voluntary not to include it in the repository

const supporters = XLSX.utils.sheet_to_json(supportersXLSX.Sheets[supportersXLSX.SheetNames[0]]);

let usedNames = {};
supporters.forEach((supporter, index) => {
    if (typeof supporter.Nom === 'string') {
        let normalizedSupporter = normalizeSupporter(supporter);

        const filename = `${diacritics.remove(changeCase.snakeCase(sanitize(supporter.Nom)))}-${ supporter.Catégorie}-${ supporter.Nationalité }.md`;
        const path = `${DEST_FOLDER}/${filename}`;

        if (usedNames[filename]) {
            console.error(`Collision detected on ${filename}`);
        }

        usedNames[filename] = true;

        fs.writeFile(path, generateContent(normalizedSupporter), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    } else {
        console.log(`Entry ignored: ${supporter.Nom}`);
    }
});

