const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({ error: 'invalid query' });
    return false;
  }

  const dataFilePath = path.join(__dirname, '../../users-data.json');
  const usersListFile = fs.readFileSync(dataFilePath, 'utf-8');
  const usersList = JSON.parse(usersListFile);

  const user = usersList.data.filter(u => u.id == userId);

  if (user.length > 0) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json({ error: 'user not found' });
  }
};
