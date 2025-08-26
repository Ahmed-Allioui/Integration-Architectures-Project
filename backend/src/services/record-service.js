const Salesman = require("../models/Salesman");

exports.getSalesmanRecords = function (sid, year) {
  const y = Number(year);
  return Salesman.aggregate([
    { $match: { employeeId: sid, "records.year": y } },
    { $project: projection(y) },
    { $limit: 1 },
  ]).then((results) => results[0]);
};

exports.getLatestRecordsForSalesman = async function (sid) {
  const years = await getYears();
  if(!years || years.length < 1) return new Promise((resolve => resolve({})));
  return exports.getSalesmanRecords(sid, years[0]);
};

exports.getSalesmenRecords = async function (year) {
  const years = await getYears();
  let salesmen;
  if (year) {
    salesmen = await getAllSalesmenRecordsForYear(year);
  } else {
    salesmen = await getLatestSalesmenRecords(years);
  }
  return { years, salesmen };
};

exports.initRecordsIfNotExists = function (id, year) {
  return Salesman.findOne({ employeeId: id, "records.year": year }).then(
    (salesman) => {
      if (!salesman) {
        return Salesman.updateOne(
          { employeeId: id },
          {
            $push: {
              records: {
                year: year,
                orders: [],
                socialPerformances: [],
              },
            },
          },
        );
      }
      return true;
    },
  );
};

exports.updateRecords = function (sid, year, orders, socialPerformances) {
  return Salesman.updateOne({ employeeId: sid, "records.year": year }, {
    $set: {
      "records.$.orders": orders,
      "records.$.socialPerformances": socialPerformances,
    },
  }).then(() => module.exports.getSalesmanRecords(sid, year));
};

exports.saveRemarks = async function (sid, year, data) {
  return Salesman.updateOne(
    { employeeId: sid, "records.year": year },
    { $set: { "records.$.remarks": data.remarks } },
  );
};

exports.resetValidation = async function (sid, year) {
  return Salesman.updateOne(
    { employeeId: sid, "records.year": year },
    {
      $set: {
        "records.$.validatedByCEO": null,
        "records.$.validatedByHR": null,
        "records.$.validatedBySalesman": null,
      },
    },
  );
};

exports.resetValidationIfModified = async function (data, sid, year) {
  if (data.modifiedCount > 0 || data.upsertedCount > 0) {
    return module.exports.resetValidation(sid, year);
  }
};

const getYears = async function () {
  return Salesman.find({})
      .then(extractYearsFromSalesmen);
};

const getLatestSalesmenRecords = function (years) {
  if (!years || years.length < 1) return [];
  return getAllSalesmenRecordsForYear(years[0]);
};

const getAllSalesmenRecordsForYear = function (year) {
  const y = Number(year);
  return Salesman.aggregate([
    { $match: { "records.year": y } },
    { $project: projection(y) },
  ]);
};

const projection = (year) => {
  return {
    employeeId: 1,
    orangeHRMId: 1,
    firstName: 1,
    lastName: 1,
    jobTitle: 1,
    department: 1,
    records: {
      $filter: {
        input: "$records",
        as: "record",
        cond: {
          $eq: ["$$record.year", year],
        },
      },
    },
  };
};

const extractYearsFromSalesmen = function (salesmen) {
  const years = new Set();
  for (const salesman of salesmen) {
    if (!salesman.records) continue;
    for (const record of salesman.records) {
      years.add(record.year);
    }
  }
  return Array.from(years).sort((a, b) => b - a);
};
