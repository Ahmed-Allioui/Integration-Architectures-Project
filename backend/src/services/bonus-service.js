const recordService = require("./record-service");
const bonusHRMService = require("../remote/orange-hrm/service/bonus-service");
const { Bonus } = require("../remote/orange-hrm/dto/bonus");
const Roles = require("../security/role");
const Salesman = require("../models/Salesman");

/**
 * price factors
 */
const ORDERS_PRICE_FACTOR = 3e-2;
const SP_PRICE_FACTOR = 100;

/**
 * this function generates and update bonus for a salesman and a specific year
 * @param {*} sid
 * @param {*} year
 * @returns
 */
exports.generateSalesmanBonus = async function (sid, year) {
    const salesman = await getSalesman(sid, year);
    if (salesman.records.length < 1) return;
    const record = salesman.records[0];
    const orders = generateOrdersBonus(record.orders);
    const socialPerformances = generateSPsBonus(record.socialPerformances);
    return recordService.updateRecords(sid, year, orders, socialPerformances);
};

/**
 * this function validates a bonus for a salesman and a specific year
 * @param {*} currentUser
 * @param {*} sid
 * @param {*} year
 * @returns
 */
exports.validateBonus = async function (currentUser, sid, year) {
  if (!currentUser) throw new Error("current user is not known");
  switch (currentUser.role) {
    case Roles.CEO.name:
      return validateRecordAsCEO(sid, year);
    case Roles.HR.name:
      return validateRecordAsHR(sid, year);
  }
  return new Promise(() => {
    throw new Error("You are not allowed to validate bonuses");
  });
};

/**
 * this function validates a bonus for a salesman and a specific year
 * @param {*} currentUser
 * @param {*} sid
 * @param {*} year
 * @returns
 */
exports.rejectBonus = async function (currentUser, sid, year) {
    if (!currentUser) throw new Error("current user is not known");
    switch (currentUser.role) {
        case Roles.CEO.name:
            return rejectRecordAsCEO(sid, year);
        case Roles.HR.name:
            return rejectRecordAsHR(sid, year);
    }
    return new Promise(() => {
        throw new Error("You are not allowed to validate bonuses");
    });
};

/**
 * this function validates a bonus for a logged-in salesman and a specific year
 * @param {*} currentUser
 * @param {*} year
 * @returns
 */
exports.validateCurrentSalesmanBonus = async function (currentUser, year) {
  if (!currentUser) throw new Error("current user is not known");
  const sid = currentUser.employeeId;
  if (!sid || currentUser.role !== Roles.SALESMAN.name) {
    throw new Error(
      "This operation is only allowed for salesmen with valid ID",
    );
  }
  return validateRecordAsSalesman(sid, year);
};

/**
 * this function validates a bonus for a logged-in salesman and a specific year
 * @param {*} currentUser
 * @param {*} year
 * @returns
 */
exports.rejectCurrentSalesmanBonus = async function (currentUser, year) {
    if (!currentUser) throw new Error("current user is not known");
    const sid = currentUser.employeeId;
    if (!sid || currentUser.role !== Roles.SALESMAN.name) {
        throw new Error(
            "This operation is only allowed for salesmen with valid ID",
        );
    }
    return rejectRecordAsSalesman(sid, year);
};

/**
 * this function calculate the sum of bonus of a salesman for a specific year and send it to orangeHRM
 * @param {*} sid
 * @param {*} year
 * @returns
 */
exports.sendBonusToOrangeHRM = async function (sid, year) {
  const salesman = await getSalesman(sid, year);
  if (salesman.records.length < 1) return;
  const record = salesman.records[0];
  let bonus = sumBonus(record.orders);
  bonus += sumBonus(record.socialPerformances);
  bonus = Math.round(bonus);
  return bonusHRMService.sendBonusToOrangeHRM(
    salesman.orangeHRMId,
    new Bonus(year, bonus),
  );
};

const validateRecordAsCEO = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedByCEO": true });
};

const rejectRecordAsCEO = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedByCEO": false });
};

const validateRecordAsHR = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedByHR": true });
};

const rejectRecordAsHR = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedByHR": false });
};

const validateRecordAsSalesman = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedBySalesman": true });
};

const rejectRecordAsSalesman = async function (sid, year) {
    return setAttribute(sid, year, { "records.$.validatedBySalesman": false });
};

/**
 * set the attributes set to the salesman with ID sid for a year
 * @param sid
 * @param year
 * @param set
 * @returns {Promise<>}
 */
const setAttribute = async function (sid, year, set) {
    return Salesman.updateOne(
        { employeeId: sid, "records.year": year },
        { $set: set },
    ).then(() => recordService.getSalesmanRecords(sid, year));
};

/**
 * this function loads a specific record from the database for bonus calculations and summation
 * @param {*} sid
 * @param {*} year
 * @returns
 */
const getSalesman = async function (sid, year) {
    const salesman = await recordService.getSalesmanRecords(sid, year);
    if (!salesman || !salesman.records) {
        return new Promise(() => {
            throw new Error("Records or Salesman do not exists");
        });
    }
    return salesman;
};

/**
 * this function generates the bonuses for a list of orders
 * @param {*} orders
 * @returns
 */
const generateOrdersBonus = (orders) => {
    if (!orders) return null;
    return orders.map(generateOrderBonus);
};

/**
 * this function generates the bonuses for one order
 * @param {*} order
 * @returns
 */
const generateOrderBonus = (order) => {
    if (!order) return null;
    const totalPrice = order.items * order.unitPrice;
    const bonus = (totalPrice / order.clientRanking * ORDERS_PRICE_FACTOR);
    order.bonus = Math.round(bonus);
    return order;
};

/**
 * this function generates the bonuses for a list of social performances
 * @param {*} socialPerformances
 * @returns
 */
const generateSPsBonus = (socialPerformances) => {
    if (!socialPerformances) return null;
    return socialPerformances.map(generateSPBonus);
};

/**
 * this function generates the bonuses for one social performance
 * @param {*} sp
 * @returns
 */
const generateSPBonus = (sp) => {
    if (!sp) return null;
    const bonus = (sp.actualValue / sp.targetValue) * SP_PRICE_FACTOR;
    sp.bonus = Math.round(bonus);
    return sp;
};

/**
 * This is a generic function that do the sum of the bonuses of orders and social performances
 * if a bonus is missing the function throws an error
 * @param {*} performances
 * @returns
 */
const sumBonus = (performances) => {
    let bonus = 0.0;
    if (!performances) return bonus;
    for (const performance of performances) {
        if (!performance.bonus) throw Error("Not all bonuses are generated");
        bonus += performance.bonus;
    }
    return bonus;
};
