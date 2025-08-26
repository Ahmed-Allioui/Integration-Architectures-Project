const {Order} = require('../../src/dto/order');

exports.asSingle = () => {
    return createOrder();
}

exports.asArray = () => {
    return [createOrder()];
}

const createOrder = () => {
    let order = new Order();
    order.client = "client";
    order.clientRanking = 1;
    order.items = 10;
    order.productName = "Some product";
    order.unitPrice = 20;
    return order;
}