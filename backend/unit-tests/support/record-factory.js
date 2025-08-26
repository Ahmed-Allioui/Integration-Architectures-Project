const {Record} = require('../../src/dto/record');
const OrderFactory = require('./order-factory')
const SocialPerformanceFactory = require('./order-factory')

exports.asSingle = (year) => {
    return createRecord(year);
}

exports.asArray = (year) => {
    return [createRecord(year)];
}

const createRecord = (year) => {
    let record = new Record();
    record.year = year;
    record.remarks = "Some remarks";
    record.orders = OrderFactory.asArray();
    record.socialPerformances = SocialPerformanceFactory.asArray();
    return record;
}