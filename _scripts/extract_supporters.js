const parse = require('csv-parse')
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
    const content =
    `---
name: ${ supporter.Nom }
category: ${ CATEGORIES[supporter.Catégorie] || '' }
nature: ${ supporter.Nature || '' }
nationality: ${supporter.Nationalité || '' }
date_signed: '2018-11-12'
---
    `;

    return content;
}

const supportersXLSX = XLSX.readFile(SOURCE_FILE);  // this source file contains private data, it is voluntary not to include it in the repository

const supporters = XLSX.utils.sheet_to_json(supportersXLSX.Sheets[supportersXLSX.SheetNames[0]]);

supporters.forEach((supporter) => {
    const filename = `${diacritics.remove(changeCase.snakeCase(sanitize(supporter.Nom)))}.md`;

    fs.writeFile(`${DEST_FOLDER}/${filename}`, generateContent(supporter), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log(`${filename} file was saved!`);
    });
});
