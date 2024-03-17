const jwt = require("jsonwebtoken");
const axios = require('axios');
const https = require('https');

const SECRET_KEY = process.env.SECRET_KEY;

const loginAPI = async (nik) => {
  let res = await axios.post(process.env.AUTH_URL, { nik }, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });

    if (res.status) {
      return res.data;
    } else {
      return false;
    }
};

const generateToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: "24h" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err)
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    req.user = decoded;
    next()
  });
};

const accessControl = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}

module.exports = {
  generateToken,
  verifyToken,
  accessControl,
  loginAPI
}