const opencrxApi = require("../config/opencrx-api");
const adapter = require('../adapter/position-adapter')
const mapper = require('../mapper/position-mapper')

/** getting list of all sales orders */
exports.fetchPositions = async function (salesorderIdentity, products) {
    const results = await opencrxApi.get(`${salesorderIdentity}/position`);
    let data = results.data.objects;
    if(!data) return [];
    let positions = data.map(adapter.adapt);
    return data ? mapper.mapAll(positions, products) : [];
}