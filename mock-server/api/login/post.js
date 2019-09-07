const logins = require('../logins.json');

module.exports = (req, res) => {
  let jwt = '';
  const query = req.body;

  logins.data.some((u) => {
    if (u.email === query.email && u.password === query.password) {
      jwt = u.jwt;
      return true;
    }

    return false;
  });

  if (jwt) {
    res.status(200).json({success: true, jwt});
  } else {
    res.status(200).json({success: false});
  }
}
