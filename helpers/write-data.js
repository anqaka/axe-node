const fs = require('fs')
/**
 *
 * @param {object|array} data - data to write
 * @param {string} fileName - name of the file
 * @param {string} fileExtension - extension of the file
 *
 */
const writeData = (data, fileName, fileExtension) => {
  fs.writeFile(
    `${fileName}.${fileExtension}`,
    data,
    function(err) {
      if(err) return console.log('Error: ', err)
      console.log(`The file was saved as ${fileName}.${fileExtension}!`)
  })
}

module.exports = writeData
