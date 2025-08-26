const Salesman = require("../models/Salesman");
const recordService = require("./record-service");

exports.addSocialPerformance = async function (sid, year, socialPerformance) {
  socialPerformance.bonus = null;
  await recordService.initRecordsIfNotExists(sid, year);
  return await Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $push: { "records.$.socialPerformances": socialPerformance },
  }).then((data) => recordService.resetValidationIfModified(data, sid, year))
      .then(() => recordService.getSalesmanRecords(sid, year));
};

exports.deleteSocialPerformance = function (sid, year, socialPerformanceId) {
  return Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $pull: { "records.$.socialPerformances": { _id: socialPerformanceId } },
  }).then((data) => recordService.resetValidationIfModified(data, sid, year))
      .then(() => recordService.getSalesmanRecords(sid, year));
};

exports.deleteAllSocialPerformances = function (sid, year) {
  return Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $pull: { "records.$.socialPerformances": {} },
  }).then((data) => recordService.resetValidationIfModified(data, sid, year))
      .then(() => recordService.getSalesmanRecords(sid, year));
};
