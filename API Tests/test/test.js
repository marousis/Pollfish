var chai = require('chai');
var expect = chai.expect; // Using Expect style
const axios = require('axios');
const baseUrl = 'https://www.pollfish.com';
const userRegisterRoute = '/api/v3/user/register';
const loginRequest = require('../login');
const userSurveyRoute = '/api/v1/survey';
const userLogesOut = '/logout';
const uniqueEmail = require('../registration-email');
describe('Pollfish API tests', () => {
  it('User completes the registration, successfully', async function() {
    const registrationValidBody = {
      email: uniqueEmail,
      password: 'dfasdfa',
      fullName: 'fds hjgj',
      companyName: 'fsdf',
      companyEmail: '',
      qualification: '2',
      referral: 4,
      otherReferral: '',
      legal: null,
      newsletter: true,
      consentTypes: ['GDPR', 'Newsletter'],
      isDeveloper: false
    };
    const response = await axios.post(
      baseUrl + userRegisterRoute,
      registrationValidBody,
      { withCredentials: true }
    );
    const jsonResp = response.data;
    expect(response.status).to.equal(200);
    expect(jsonResp.email).to.equal(uniqueEmail);
  }).timeout(30000);

  it('User creates a survey', async function() {
    const loginSessionId = await loginRequest.loginRequest({
      email: 'fasfasfas@sadfasdf.gr',
      password: 'fadfasdfasd'
    });

    const response = await axios.put(
      baseUrl + userSurveyRoute + '?name=test_survey',
      null,
      {
        headers: {
          Cookie: loginSessionId
        }
      }
    );

    expect(response.status).to.equal(200);
    expect(response.data.name).to.equal('test_survey');
    expect(response.data.statusName).to.equal('draft');
  });
  it('User loges out', async function() {
    const loginSessionId = await loginRequest.loginRequest({
      email: 'fasfasfas@sadfasdf.gr',
      password: 'fadfasdfasd'
    });

    const response = await axios.get(baseUrl + userLogesOut, {
      headers: {
        Cookie: loginSessionId
      }
    });
    console.log(response.headers.Cookie);
    expect(response.status).to.equal(200);
    expect(response.headers.Cookie).to.not.equal(loginSessionId);
  }).timeout(30000);
});
