const usersList = require('../users-data.json');

module.exports = (req, res) => res.status(200).json(usersList);
