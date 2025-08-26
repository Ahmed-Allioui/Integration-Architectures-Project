const opencrxApi = require("../config/opencrx-api");
const adapter = require('../adapter/product-adapter')

const productStdPath = 'org.opencrx.kernel.product1/provider/CRX/segment/Standard'

/** getting list of all products */
exports.fetchAllProducts = async function () {
    const results = await opencrxApi.get(`${productStdPath}/product`);
    const products = results.data.objects;
    return products.map(adapter.adapt);
}

/** More API paths can be found in the app https://sepp-crm.inf.h-brs.de ==> Wizards ==> Explore API... */