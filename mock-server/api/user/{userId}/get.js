const usersList = require('../../users-data.json');

module.exports = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(500).json({});
  }

  const user = usersList.data.filter(u => u.id == userId);

  if (user.length > 0) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json({});
  }
};
