const orangeApi = require("../middleware/api-middleware");

exports.sendBonusToOrangeHRM = async function (orangeHRMId, bonus) {
  return orangeApi.post(`api/v1/employee/${orangeHRMId}/bonussalary`, bonus);
};
