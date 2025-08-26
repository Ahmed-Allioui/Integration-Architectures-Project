const salesorderService = require("./salesorder-service");
const SalesmanMapper = require("../mapper/salesman-mapper");


/** getting list of all salesmen */
exports.fetchAllSalesmen = async function (year) {
  return salesorderService.fetchAllSalesorders(year)
    .then((salesorders) => SalesmanMapper.map(salesorders, year));
};
