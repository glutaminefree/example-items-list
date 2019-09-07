const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const dataFilePath = path.join(__dirname, '../users-data.json');

  fs.readFile(dataFilePath, 'utf-8', (error, data) => {
    if (error) {
      res.status(500).json({ error: 'file read error' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
};
