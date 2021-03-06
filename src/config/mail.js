const nodemailer = require("nodemailer")
const emailTemplate = require('../utils/email-template')

class Mail {
  mail = null
  user = process.env.USER_EMAIL
  pass = process.env.PASS_EMAIL

  constructor () {
    this.setTransport()
  }

  setTransport () {
    this.mail = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: 587,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      }
    })
  }

  async sendEmail (from, to, subject, data) {
    try {
     let info = await this.mail.sendMail({
        from,
        to,
        subject,
        html: emailTemplate(data)
      })

      return info
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new Mail()
