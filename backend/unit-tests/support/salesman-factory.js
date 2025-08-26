const {Salesman} = require('../../src/dto/salesman');
const RecordFactory = require('./record-factory')

exports.asSingle = (sid, year) => {
    return createSalesman(sid, year);
}

exports.asArray = (sid, year) => {
    return [createSalesman(sid, year)];
}

exports.asPromise = (sid, year) => {
    return new Promise((resolve) => {
        let salesman = createSalesman(sid, year);
        resolve(salesman);
    });
}

exports.asArrayPromise = (sid, year) => {
    return new Promise((resolve) => {
        let salesmen = [createSalesman(sid, year)]
        resolve(salesmen);
    });
}

const createSalesman = (sid, year) => {
    let salesman = new Salesman();
    salesman.employeeId = sid;
    salesman.orangeHRMId = 1;
    salesman.firstName = "first name";
    salesman.lastName = "last name";
    salesman.department = "Sales";
    salesman.jobTitle = "Senior Salesman";
    salesman.records = RecordFactory.asArray(year);
    return salesman;
}