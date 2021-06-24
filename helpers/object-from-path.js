const fs = require('fs');
const path = require('path');

const objectFromPath = (filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    return JSON.parse(fs.readFileSync(fullPath));
  }
}

module.exports = objectFromPath;
