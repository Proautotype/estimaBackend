const nodemailer = require('nodemailer');
require("dotenv").config();
class EmailService {
    transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.mailTrapUser,
            pass: process.env.mailTrapPassword
        }
    });
    sendMail(to, subject, text) {
        return new Promise(
            (resolve) => {
                message = {
                    from: "winstyngyen@gmail.com",
                    to: to,
                    subject: subject,
                    text: text
                }
                this.transport.sendMail(message, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(info);
                    }
                })
            },
        );
    }

}

module.exports = EmailService;