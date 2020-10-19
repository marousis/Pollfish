const axios = require('axios');

async function loginRequest(opts) {
  const { email, password } = opts;
  const data = {
    email,
    password
  };

  const loginResp = await axios.post(
    'https://www.pollfish.com/api/v3/user/login',
    data
  );

  const help = loginResp.headers['set-cookie'][0].split(';');
  const loginSessionID = help[0];

  return loginSessionID;
}
module.exports = { loginRequest };
