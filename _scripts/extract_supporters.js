const XLSX = require('xlsx');
const sanitize = require("sanitize-filename");
const changeCase = require('change-case');
const diacritics = require('diacritics');
const fs = require('fs');


const SOURCE_FILE = `${__dirname}/supporters.xlsx`;
const DEST_FOLDER = `${__dirname}/../_supporters_fr`;
const COUNTRY_CODES_FILE = `${__dirname}/country-codes.xlsx`;

const CATEGORIES = {
    'Etat'          : 'state',
    'Secteur privé' : 'private_sector',
    'Société civile': 'civil_society',
    'Secteur public': 'local_authority',
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


function generateContent(supporter) {
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

    if (! COUNTRY_CODES[supporter.Nationalité]) {
        console.log(`Missing nationality for ${ supporter.Nom }`);
    }


    return `---
name: "${ supporter.Nom }"
category: ${ CATEGORIES[supporter.Catégorie] }
nature: "${ supporter.Nature || '' }"
nationality: ${ COUNTRY_CODES[supporter.Nationalité] || '' }
date_signed: '2018-11-12'
---
    `;
}

const supportersXLSX = XLSX.readFile(SOURCE_FILE);  // this source file contains private data, it is voluntary not to include it in the repository

const supporters = XLSX.utils.sheet_to_json(supportersXLSX.Sheets[supportersXLSX.SheetNames[0]]);

supporters.forEach((supporter) => {
    if (typeof supporter.Nom === 'string') {
        const filename = `${diacritics.remove(changeCase.snakeCase(sanitize(supporter.Nom)))}.md`;
        const path = `${DEST_FOLDER}/${filename}`;

        fs.writeFile(path, generateContent(supporter), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});
