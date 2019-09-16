const parse = require('csv-parse')
const XLSX = require('xlsx');
const sanitize = require("sanitize-filename");
const changeCase = require('change-case');
const diacritics = require('diacritics');
const fs = require('fs');

const supportersXLSX = XLSX.readFile('supporters.xlsx');

const supporters = XLSX.utils.sheet_to_json(supportersXLSX.Sheets[supportersXLSX.SheetNames[0]]);

supporters.forEach((supporter) => {
    const filename = `${diacritics.remove(changeCase.snakeCase(sanitize(supporter.Nom)))}.md`;

    fs.writeFile(`../_supporters/${filename}`, generateContent(supporter), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(`${filename} file was saved!`);
    });
});

function extractCategory(rawValue) {
    switch (rawValue) {
        case 'Etat': return 'state';
            break;
        case 'Secteur privé': return 'private_sector';
            break;
        case 'Société civile': return 'civil_society';
            break;
        default:
            break;
    }
}

function generateContent(supporter) {
    const content =
    `name: ${supporter.Nom}
category: ${extractCategory(supporter.Catégorie)}
nature:  ${supporter.Nature || ''}
nationality: ${supporter.Nationalité || ''}
date_signed:
    `;

    return content;
}
