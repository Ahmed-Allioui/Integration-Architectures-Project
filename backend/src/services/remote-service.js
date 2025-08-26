const salesmanCRXService = require(
  "../remote/open-crx/service/salesman-service",
);
const salesmanHRMService = require(
  "../remote/orange-hrm/service/salesman-service",
);
const salesmanService = require("./salesman-service");

exports.importSalesmen = async function (year) {
  const salesmenCRXPromise = salesmanCRXService.fetchAllSalesmen(year);
  const salesmenHRMPromise = salesmanHRMService.fetchAllEmployees();
  return Promise.all([salesmenCRXPromise, salesmenHRMPromise])
    .then(([salesmenCRX, salesmenHRM]) => match(salesmenCRX, salesmenHRM))
    .then((salesmen) => salesmen.filter((salesman) => salesman.employeeId)) // select only salesman having an employeeId
    .then((salesmen) => salesmanService.persistAllImportedSalesmen(salesmen));
};

const match = function (salesmenCRX, salesmenHRM) {
  if (!salesmenCRX || !salesmenHRM) return [];
  return salesmenCRX.map((salesmanCRX) => {
    const foundSalesman = salesmenHRM.find((s) =>
      s.code == salesmanCRX.employeeId
    );
    if (foundSalesman) {
      salesmanCRX.orangeHRMId = foundSalesman.employeeId;
      salesmanCRX.firstName = foundSalesman.firstName;
      salesmanCRX.lastName = foundSalesman.lastName;
      salesmanCRX.jobTitle = foundSalesman.jobTitle;
      salesmanCRX.department = foundSalesman.unit;
    }
    return salesmanCRX;
  });
};
