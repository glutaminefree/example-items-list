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

  const users = {
    data: usersList.data.filter(u => u.id !== userId),
  };

  if (users.data.length < usersList.data.length) {
    fs.writeFile(
      dataFilePath,
      JSON.stringify(users, null, 2),
      (error) => {
        error
          ? res.status(500).json({ result: 'error' })
          : res.status(200).json({ result: 'success' });
      }
    );
  } else {
    res.status(400).json({ error: 'user not found' });
  }
};
