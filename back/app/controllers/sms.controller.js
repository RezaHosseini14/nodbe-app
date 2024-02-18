const nodmailer = require("nodemailer");
class SmsController {
  async sendSms(req, res, next) {
    try {
      var Kavenegar = require("kavenegar");
      var api = await Kavenegar.KavenegarApi({
        apikey: "534A7277646D6A414D786D5868784B643879316559326F4F30794C5464476F733477523052497044466A633D",
      });
      //   return res.status(400).json({ status: 400, success: false, message: "نفرستاد" });
      api.Send(
        {
          message: "وب سرویس تخصصی کاوه نگار",
          sender: "10004346",
          receptor: "09120187067",
        },
        function (response, status) {
          res.status(status).json({ status: status, success: false, message: response });
        }
      );
    } catch (err) {
      next(err);
    }
  }

  async sendEmail(req, res, next) {
    try {
      const { to, subject, text } = req.body;

      const transporter = nodmailer.createTransport({
        service: "gmail",
        auth: {
          user: "nodbeh.info@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: "nodbeh.info@gmail.com",
        to,
        subject,
        text,
      });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ایمیل ارسال شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async sendMultiEmails(req, res, next) {
    try {
      const { to, subject, text } = req.body;
      const transporter = nodmailer.createTransport({
        service: "gmail",
        auth: {
          user: "nodbeh.info@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });

      const emails = [
        {
          to: "reza.hosseini.biuky@gmail.com",
          subject: "ایمیل 1",
          text: "متن ایمیل 1",
        },
        {
          to: "reza.hosseini.biuky@gmail.com",
          subject: "ایمیل 2",
          text: "متن ایمیل 2",
        },
        // ادامه ایمیل ها
      ];
      const promises = emails.map((email) => {
        return transporter.sendMail(email);
      });

      await Promise.all(promises);
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ایمیل ارسال شد",
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = {
  SmsController: new SmsController(),
};
