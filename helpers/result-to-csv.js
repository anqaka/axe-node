const converter = require('json-2-csv')
const writeData = require('./write-data')

function writeToCsv (issuesArray, fileName) {
  const options = {
    expandArrayObjects: true,
    unwindArrays: true
  }
  converter.json2csvAsync(issuesArray, options)
    .then((csv) => {
        writeData(csv, fileName, 'csv')
      })
    .catch((err) => console.log('ERROR: ' + err.message))
}

module.exports = writeToCsv
