const express = require("express");
const cors = require("cors");
const nhaxuatbanRouter = require("./app/routes/nhaxuatban.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const sachRouter = require("./app/routes/sach.route");
const docgiaRouter = require("./app/routes/docgia.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/nhaxuatban", nhaxuatbanRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/sach", sachRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);

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
