const fs = require('fs');
const path = require('path');
const usersList = require('../users-data.json');

module.exports = (req, res) => {
  usersList.data.push(req.body);

  fs.writeFile(
    path.join(__dirname, '../users-data.json'),
    JSON.stringify(usersList, null, 2),
    (error) => {
      error
        ? res.status(500).json({ result: 'error' })
        : res.status(200).json({ result: 'success' });
    }
  );
};
