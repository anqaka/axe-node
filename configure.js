const path = require('path');
const fs = require('fs');
const getConfig = require('./helpers/get-config');
const customConfig = path.join(process.cwd(), 'axe.config.json');
const resultsDir = path.join(process.cwd(), getConfig().resultsDir);

const configure = () => {
  if (!fs.existsSync(resultsDir)){
    fs.mkdirSync(resultsDir);
  };

  if (!fs.existsSync(customConfig)){
    fs.writeFileSync(customConfig, JSON.stringify({ "pages": [] }));
  };
}

module.exports = configure();
