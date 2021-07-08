import * as converter from 'json-2-csv';
import writeData from './write-data';

function writeToCsv(issuesArray: any[], fileName: string) {
  converter
    .json2csvAsync(issuesArray)
    .then((csv: any) => {
      writeData(csv, fileName, 'csv');
    })
    .catch((err) => console.log('ERROR: ' + err.message));
}

export default writeToCsv;
