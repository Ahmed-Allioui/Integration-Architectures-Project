const opencrxApi = require("../config/opencrx-api");
const salesorderAdapter = require("../adapter/salesorder-adapter");
const enricher = require("../enricher/salesorder-enricher");
const salesorderFilter = require("../filter/salesorder-filter");

const contractStdPath =
  "org.opencrx.kernel.contract1/provider/CRX/segment/Standard";

/** getting list of all sales orders */
exports.fetchAllSalesorders = async function (year) {
  const salesOrdersPromise = exports.requestAllSalesorderFromRemote(year);
  return enricher.enrich(salesOrdersPromise)
    .then((salesorders) => {
      // if the result contains only one element, then no reduce is needed
      if (salesorders.length < 2) return salesorders;
      // if more than one element exists, we need to do the reduce call
      return salesorders.reduce((accumulator, value) =>
        addSalesorder(accumulator, value)
      );
    });
};

exports.requestAllSalesorderFromRemote = async function (year) {
  return opencrxApi.get(`${contractStdPath}/salesOrder`)
    .then((result) => result.data.objects)
    .then((salesorders) => salesorderFilter.filter(salesorders, year))
    .then((salesorders) => salesorders.map(salesorderAdapter.adapt));
};

const addSalesorder = function (accumulator, salesorder) {
  if (!Array.isArray(accumulator)) {
    accumulator = new Array(accumulator);
  }
  for (const item of accumulator) {
    if (item.salesman.employeeId === salesorder.salesman.employeeId) {
      item.addPositions(salesorder.positions);
      return accumulator;
    }
  }
  accumulator.push(salesorder);
  return accumulator;
};
