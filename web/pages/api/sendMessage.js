import nodemailer from "nodemailer";
import { google } from "googleapis";

const handler = async (req, res) => {
  const CLIENT_ID = '877759776144-cc5dvlisovcepj8s0eori5900gkcgboq.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REFRESH_TOKEN = '1//04Q6CSqsTfyIuCgYIARAAGAQSNwF-L9Irb-OGlUQJ7wC012krExGudSB5-cs4XdGKQGqDsS1Ur7Fw__nslq0YJ776zC_WdKf9wE0';
  const REDIRECT_URL = 'https://developers.google.com/oauthplayground/';
  const oAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
  try {
    const accesToken = await oAuth2client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "mib4u0@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesToken
      },
      tls: { rejectUnauthorized: false }
    });
    const mailOptions = {
      from: `MIB4u <mib4u0@gmail.com>`,
      to: "mib4u0@gmail.com",
      subject: "Customer Message",
      html: `
      <h1 style="color: purple;" >MIB4u Gallery</h1>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Full Name: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.name}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Email: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.email} </span></P><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: purple;" >${req.body.message}</span></p>
      `
    };
    const mailOptions2 = {
      from: `MIB4u <mib4u0@gmail.com>`,
      to: req.body.email,
      subject: "MIB4u Gallery",
      html: `
      <h1 style="color: purple;" >Welcome to MIB4u Gallery</h1><br/>
      <p style="font-size: 20px; font-weight: 600;" >Thankyou! for Contacting us.</p><br/>
      <p style="font-weight: 600; font-size: 17px;" ><span style="color: purple; text-transform: capitalize;" >${req.body.name}</span> We can discuss about your query in more detail. Contact us <span style="color: purple; text-decoration: underline;" ><a href='tel:0310-2223511' >0310-2223511</a></span></P>
      `
    }
    transport.sendMail(mailOptions);
    transport.sendMail(mailOptions2)
    res.status(200).json({ success: true, message: "Thank you for contacting us." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Sorry! didn't contact." })
  }
}

export default handler