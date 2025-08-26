const express = require("express");
const app = express();

/**
 * Setting environment object
 */
const environment = require("./config/env").default();
app.set("environment", environment);

/**
 * REST configuration
 */
const rest = require("./config/rest");
rest.config(app, express);

/**
 * Starting database
 */
const db = require("./config/database");
db.start(app);

/**
 * Mounting swagger UI
 */
const swaggerUi = require("./config/swagger-ui-express");
swaggerUi.mount(app);
