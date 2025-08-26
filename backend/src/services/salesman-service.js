const Salesman = require("../models/Salesman");
const orderService = require("./order-service");

exports.persistAllImportedSalesmen = async function (salesmen) {
  if (!salesmen || !Array.isArray(salesmen)) return new Promise(resolve => resolve([]));
  return salesmen.map(persistImportedSalesman);
};

exports.deleteSalesman = function (id) {
  return Salesman.deleteOne({ employeeId: id });
};

exports.deleteAllSalesmen = function () {
  return Salesman.deleteMany({});
};

const persistImportedSalesman = async function (salesman) {
  if (!salesman.employeeId) return new Promise(resolve => resolve({}));
  return getSalesman(salesman.employeeId)
      .then((result) => {
        return result
            ? updateSalesmanOrders(salesman)
            : createSalesman(salesman);
      })
      .catch(() => createSalesman(salesman));
};

const getSalesman = function (id) {
  return Salesman.findOne({ employeeId: id });
};

const createSalesman = function (salesman) {
  return Salesman.create(salesman);
};

const updateSalesmanOrders = async function (salesman) {
  const records = salesman.records;
  if (!records || !Array.isArray(records)) return new Promise();
  return records.map((record) =>
    orderService.addOrders(salesman.employeeId, record.year, record.orders)
  );
};
