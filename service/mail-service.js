const nodemailer = require("nodemailer");
const {SMTP_HOST, SMTP_PORT, SMTP_LOGIN, SMTP_PASSWORD, API_URL} = require("../config");

class MailService {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_LOGIN,
        password: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this._transporter.sendMail({
      from: SMTP_LOGIN,
      to,
      subject: `Активация на сайте ${API_URL}`,
      text: ``,
      html:
      `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href=${link}>${link}</a>
        </div>
      `
    });
  }
}

module.exports = {
  mailService: new MailService(),
};
