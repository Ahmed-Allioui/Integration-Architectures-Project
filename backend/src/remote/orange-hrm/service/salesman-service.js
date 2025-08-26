const orangeApi = require("../middleware/api-middleware");

/** getting list of all employees */
exports.fetchAllEmployees = async function () {
  const response = await orangeApi.get(`api/v1/employee/search`);
  return response.data.data;
};