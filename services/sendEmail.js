const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOSTNAME,
    port: process.env.SMTP_PORT,
    secure: false,
    auth:{
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    }

})

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
    from: `<hello@demomailtrap.co>`,
      to,
      subject,
      text,
      html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[*] Email launched to ${to}: ${info.messageId}`);
      } catch (err) {
        console.error(`Email launch failed: ${err.message}`);
      }
}

module.exports = {
    sendEmail,
    transporter
};
