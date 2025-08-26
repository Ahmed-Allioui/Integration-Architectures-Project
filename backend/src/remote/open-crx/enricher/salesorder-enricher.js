const positionService = require("../service/position-service");
const productService = require("../service/product-service");
const accountService = require("../service/account-service");
const salesorderMapper = require("../mapper/salesorder-mapper");

/**
 * This function taks salesorder promise and wait for it until all salesorder come.
 * In the mean time call product and account service to get all products and
 * accounts (salesmen and customers).
 * Than enrich the every salesorder with positions, salesmen and accounts
 */
exports.enrich = async function (salesOrdersPromise) {
  const productsPromise = productService.fetchAllProducts();
  const accountsPromise = accountService.fetchAllAccounts();
  const [products, accounts, salesOders] = await Promise.all([
    productsPromise,
    accountsPromise,
    salesOrdersPromise,
  ]);
  let promises = salesOders.map((so, index) => {
    return positionService.fetchPositions(so.href, products)
      .then((positions) =>
        salesOders[index] = salesorderMapper.map(so, positions, accounts)
      );
  });
  await Promise.all(promises);
  return salesOders;
};
