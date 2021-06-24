const fs = require('fs');
/**
 *
 * @param {object|array} data - data to write
 * @param {string} fileName - name of the file
 * @param {string} fileExtension - extension of the file
 *
 */
const writeData = (data:string, fileName:string, fileExtension:string) => {
  fs.writeFile(`${fileName}.${fileExtension}`, data, function (err:any) {
    if (err) return console.log('Error: ', err);
    console.log(`The file was saved as ${fileName}.${fileExtension}!`);
  });
};

export default writeData;
