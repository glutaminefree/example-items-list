const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!userId) {
    res.status(400).json({ error: 'invalid query' });
    return false;
  }

  const dataFilePath = path.join(__dirname, '../../users-data.json');
  const usersListFile = fs.readFileSync(dataFilePath, 'utf-8');
  const usersList = JSON.parse(usersListFile);

  usersList.data.some((u, i, all) => {
    if (u.id === userId) {
      Object.assign(all[i], req.body);
      return true;
    }
  });

  fs.writeFile(
    dataFilePath,
    JSON.stringify(usersList, null, 2),
    (error) => {
      error
        ? res.status(500).json({ result: 'error' })
        : res.status(200).json({ result: 'success' });
    }
  );
};
