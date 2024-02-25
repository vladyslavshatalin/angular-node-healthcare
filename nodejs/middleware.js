let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {

  /*write your middleware code here*/
  const secretToken = config.secret; // Secret token for generating JWT

  // Extract the token from the request headers
  const authHeader = req.header('Authorization') || req.header('x-access-token');
  /* if (!authHeader) {
    console.log('token not valid')
    return res.status(400).json({ error: 'Please authenticate' });
  } */

  const token = authHeader; // Extract the token part
  console.log("authHeader", authHeader)
  console.log("token", token)
  console.log("secretToken", secretToken)

  /* if (!token) {
    console.log('token not found')
    return res.status(400).json({ error: 'Please authenticate' });
  } */

  // try {
  // Verify the token using the secret key
  const decoded = jwt.verify(token, secretToken);
  // if (decoded._id.length > 0) {
  console.log('token verified')
  next();
  /* } else {
    console.log('token invalid', decoded)
    return res.status(400).json({ error: 'Please authenticate' });
  } */
  /* } catch (error) {
    console.log('middleware error', error)
    return res.status(400).json({ error: 'Please authenticate' });
  } */

};


module.exports = {
  checkToken: checkToken
}