const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const nhaxuatbanRouter = require("./app/routes/nhaxuatban.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const sachRouter = require("./app/routes/sach.route");
const docgiaRouter = require("./app/routes/docgia.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với thư viện mượn sách." });
});

app.use("/api/nhaxuatban", nhaxuatbanRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/sach", sachRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);
// Cấu hình transporter cho Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // hoặc dịch vụ email bạn muốn sử dụng
//   auth: {
//     user: 'thuvientructuyen001@gmail.com', // Địa chỉ email của bạn
//     pass: 'tien@123' // Mật khẩu email của bạn
//   }
// });

// // Endpoint để gửi email
// app.post('/send-email', (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//     from: 'thuvientructuyen001@gmail.com',
//     to,
//     subject,
//     text
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// });
//Xử lý lỗi 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(console.error.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
