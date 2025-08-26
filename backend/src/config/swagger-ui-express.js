const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("./swagger-jsdoc");

const openapiSpecification = swaggerJsdoc.openapiSpecification;

exports.mount = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
