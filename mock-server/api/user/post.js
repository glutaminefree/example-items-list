const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const dataFilePath = path.join(__dirname, '../users-data.json');
  const usersListFile = fs.readFileSync(dataFilePath, 'utf-8');
  const usersList = JSON.parse(usersListFile);

  const allIds = usersList.data.map(u => u.id);
  const id = Math.max(...allIds) + 1;

  usersList.data.push({
    id,
    ...req.body,
  });

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
