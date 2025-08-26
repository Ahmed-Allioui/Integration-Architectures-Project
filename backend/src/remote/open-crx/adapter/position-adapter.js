/**
 * this module is responsible to adapte remote "position" to the position class
 */

const { Position } = require("../dto/position")

exports.adapt = function (value) {
    let position = new Position();
    position.product = value.product;
    position.quantity = value.quantity;
    position.amount = value.amount;
    return position;
}