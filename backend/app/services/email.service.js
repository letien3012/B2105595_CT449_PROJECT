const nodemailer = require("nodemailer");

// Cấu hình transporter để kết nối tới dịch vụ gửi email
const transporter = nodemailer.createTransport({
  service: "gmail", // Hoặc dịch vụ bạn sử dụng (ví dụ: gmail, sendgrid, mailgun...)
  auth: {
    user: "thuvientructuyen001@gmail.com", // Thay thế với email của bạn
    pass: "tien@123", // Thay thế với mật khẩu ứng dụng hoặc mật khẩu email
  },
});
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "thuvientructuyen001@gmail.com",
    to: to, // Địa chỉ email người nhận
    subject: subject,
    text: text, // Nội dung email
  };

  // Gửi email
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };