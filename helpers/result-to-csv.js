const converter = require('json-2-csv')
const writeData = require('./write-data')

function writeToCsv (issuesArray, fileName) {
  converter.json2csvAsync(issuesArray)
    .then((csv) => {
        writeData(csv, fileName, 'csv')
      })
    .catch((err) => console.log('ERROR: ' + err.message))
}

module.exports = writeToCsv
