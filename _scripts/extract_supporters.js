const XLSX = require('xlsx');
const sanitize = require("sanitize-filename");
const changeCase = require('change-case');
const diacritics = require('diacritics');
const fs = require('fs');


const SOURCE_FILE = `${__dirname}/supporters.xlsx`;
const DEST_FOLDER = `${__dirname}/../_supporters`;

const CATEGORIES = {
    'Etat'          : 'state',
    'Secteur privé' : 'private_sector',
    'Société civile': 'civil_society',
};

function generateContent(supporter) {
    supporter.alliance = [];

    if (supporter.Nom.includes('**')) {
        supporter.alliance.push('Cyber Tech Accord');
        supporter.Nom = supporter.Nom.replace('\*\*', '');
    }

    if (supporter.Nom.includes('*')) {
        supporter.alliance.push('Charter of Trust');
        supporter.Nom = supporter.Nom.replace('\*', '');
    }


    return `---
name: ${ supporter.Nom }
category: ${ CATEGORIES[supporter.Catégorie] || '' }
nature: ${ supporter.Nature || '' }
nationality: ${ supporter.Nationalité || '' }
alliance: ${ supporter.alliance.join(', ') }
date_signed: '2019-10-10'
---
    `;
}

const supportersXLSX = XLSX.readFile(SOURCE_FILE);  // this source file contains private data, it is voluntary not to include it in the repository

const supporters = XLSX.utils.sheet_to_json(supportersXLSX.Sheets[supportersXLSX.SheetNames[0]]);
debugger
supporters.forEach((supporter) => {
    if (typeof supporter.Nom === 'string') {
        const filename = `${diacritics.remove(changeCase.snakeCase(sanitize(supporter.Nom)))}.md`;
        const path = `${DEST_FOLDER}/${filename}`;

        if (!fs.existsSync(path)) {
            fs.writeFile(path, generateContent(supporter), function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log(`${filename} file was saved!`);
            });
        }
    }
});
