const Salesman = require("../models/Salesman");
const recordService = require("./record-service");

exports.addOrders = async function (sid, year, orders) {
  await recordService.initRecordsIfNotExists(sid, year);
  return Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $set: { "records.$.orders": orders },
  }).then((data) => recordService.resetValidationIfModified(data, sid, year));
};

exports.deleteAllOrders = function (sid, year) {
  return Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $pull: { "records.$.orders": {} },
  }).then((data) => recordService.resetValidationIfModified(data, sid, year));
};
