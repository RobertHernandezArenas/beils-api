import nodemailer from 'nodemailer';
import { CONFIG_GLOBALS } from '@/config';

// Create a transporter object using a fake email service
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_user', // generated ethereal user
    pass: 'your_pass', // generated ethereal password
  },
});

export const emailAdapter = {
  send: async (to: string, subject: string, html: string) => {
    console.log('==== SENDING EMAIL ====');
    // In a real application, you would use the transporter to send the email
    // For this example, we'll just log the information
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML: ${html}`);
    console.log('=======================');

    // You can uncomment the following lines to actually send the email
    // with an ethereal account, but for this case we will just log the email
    /*
    const info = await transporter.sendMail({
      from: `"Your App" <${CONFIG_GLOBALS.EMAIL.FROM}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    */
    return Promise.resolve();
  },
};
