const mapOne = function(position, products) {
    if(!position) return {}
    position.product = products.filter(product => product.identity == position.product['$'])[0]
    return position;
}

exports.mapAll = function(positions, products) {
    return positions.map(position => mapOne(position, products));
}