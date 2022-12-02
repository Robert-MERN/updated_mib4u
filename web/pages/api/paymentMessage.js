import nodemailer from "nodemailer";
import { google } from "googleapis";

const handler = async (req, res) => {
  const CLIENT_ID = '877759776144-cc5dvlisovcepj8s0eori5900gkcgboq.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REFRESH_TOKEN = '1//04Lzim6Co_hZjCgYIARAAGAQSNwF-L9IrfnawJ6gpr67qzG_PGM_OHUfC8DMU8Bz8NSM35XTWr7y3iDog57tASEbCjhLcenHcp9w';
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
      subject: "Customer Payment",
      html: `
      <h1 style="color: purple;" >Racker Agency</h1>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Full Name: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.name}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Contact: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.phoneNo}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Zip Code: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.zipCode}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >House Number: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.houseNo}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Street Number: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.street}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >City: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.city}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Country: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.country}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >User ID: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.userId}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Work ID: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.workId}</span></P>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;" >Price: <span style="color: #4a8aca; text-decoration: underline;" > ${req.body.price}</span></P>
      `
    };
    const mailOptions2 = {
      from: `MIB4u Gallery <mib4u0@gmail.com>`,
      to: req.body.email,
      subject: "MIB4u Gallery",
      html: `
      <h1 style="color: purple;" >Welcome To MIB4u.</h1><br/>
      <p style="font-size: 20px; font-weight: 600;" >Thankyou! for Contacting us.</p><br/>
      <p style="font-weight: 600; font-size: 17px;" ><span style="color: purple; text-transform: capitalize;" >${req.body.firstName} ${req.body.lastName},</span>Your payment has been proceeded however, if you want to be in touch with us or having any query. You can contact on this <span style="color: purple; text-decoration: underline;" ><a href='tel:0310-2223511' >0310-2223511</a></span></P>
      `
    }
    transport.sendMail(mailOptions);
    transport.sendMail(mailOptions2)
    res.status(200).json({ success: true, message: "Thankyou! for giving us your detail. Now choose method to pay." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Sorry! couldn't make payment." })
  }
}

export default handler