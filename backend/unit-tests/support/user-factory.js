const User = require('../../src/models/User');

exports.asCEO = () => {
    let ceo = createDefaultUser();
    ceo.role = "CEO";
    return ceo;
}

exports.asAdmin = () => {
    let admin = createDefaultUser();
    admin.role = "Admin";
    return admin;
}

exports.asSalesman = (sid) => {
    let salesman = createDefaultUser();
    salesman.role = "Salesman";
    salesman.employeeId = sid;
    return salesman;
}

exports.asHR = () => {
    let hr = createDefaultUser();
    hr.role = "HR";
    return hr;
}

const createDefaultUser = () => {
    let user = new User();
    user.email = "email";
    user.firstname = "first name";
    user.lastname = "last name";
    user.username = "username";
    user.password = "password";
    user.role = "Admin";
    return user;
}