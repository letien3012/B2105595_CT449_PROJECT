const config = {
  app: {
    port: process.env.PORT || 3005,
    jwt_secret: process.env.JWT_SECRET || "leminhtienb2105595",
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/QuanLyMuonSach"
  }
};

module.exports = config;
