
const nodemailer = require("nodemailer");
const path = require("path");

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(req, to, name, surname, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Активація аккаунту на " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    <h1>Вітаю, ${name} </h1>
                    <h2>Для активації перейдіть по посиланню</h2>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

    async sendPasswordForgot(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Відновлення паролю вашого аккаунту на сайті: " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    
                    <h2>Введіть цей код в форму на сайті: ${code}</h2>
                </div>
            `
        })
    }


}
module.exports = new MailService;
