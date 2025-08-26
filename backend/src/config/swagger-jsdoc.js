const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HighPerformance API",
      version: "1.0.0",
      description: 'TEAM 7',
    },
  },
  apis: ["./src/routes/*.js"],
};

exports.openapiSpecification = swaggerJsdoc(options);
