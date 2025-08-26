const { Order } = require("../../../dto/order");

exports.map = function (salesorder) {
  if (!salesorder) return [];
  const positions = salesorder.positions;
  if (!positions) return [];
  return positions.map((position) => mapOne(salesorder, position));
};

const mapOne = function (salesorder, position) {
  let order = new Order();
  order.productName = position.product.name;
  order.items = parseFloat(position.quantity);
  order.unitPrice = parseFloat(position.amount);
  order.client = salesorder.customer.name;
  order.clientRanking = salesorder.customer.accountRating;
  return order;
};
