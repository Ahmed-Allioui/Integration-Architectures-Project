const { Salesman } = require("../../../dto/salesman");
const { Record } = require("../../../dto/record");
const orderMapper = require("../mapper/order-mapper");

exports.map = function (salesorders, year) {
  if (!salesorders) return [];
  return salesorders.map((salesorder) => mapOne(salesorder, year));
};

const mapOne = function (salesorder, year) {
  let salesman = new Salesman();
  salesman.employeeId = salesorder.salesman.employeeId;
  const record = new Record();
  record.year = year;
  record.orders = orderMapper.map(salesorder);
  salesman.records = new Array(record);
  return salesman;
};
