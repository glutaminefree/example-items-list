// const fs = require('fs');
// const path = require('path');

module.exports = (req, res) => {
  console.log('users patch - req.params', req.params);
  // const userId = req.params.userId || 0;
  res.status(200).json({result: 'ok'});
};
