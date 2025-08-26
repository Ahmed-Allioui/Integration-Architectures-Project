const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/",
  timeout: 3000,
  headers: { "Accept": "application/json" },
  auth: {
    username: "guest",
    password: "guest",
  },
});