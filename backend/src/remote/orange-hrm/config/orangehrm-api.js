const axios = require("axios");

module.exports = axios.create({
  baseURL:
    "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
  },
});
