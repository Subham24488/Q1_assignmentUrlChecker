//please set up the google-cloud-storage account
//create a new project
//under api services setup the OAuth consent screen
//then create the required credentials

const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = 'YOUR CLIENT ID';
const CLEINT_SECRET = 'YOUR CLIENT SECRET';
const REDIRECT_URI = 'Your REDIRECT URL';
const REFRESH_TOKEN = 'YOUR REFRESH TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(clientmail, faultyurl) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'yours authorised email address',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'subham.chowdhury.bksc@gmail.com',
      to: `${clientmail}`,
      subject: 'Hello from gmail using API',
      text: 'Hello from YourURLTester',
      html: `<h1>url:${faultyurl}, FAILED!!</h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports =sendMail;