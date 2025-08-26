const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const environment = require("./env").default();

//preparing database credentials for establishing the connection:
let db_credentials = "";
if (environment.db.username) {
  db_credentials = environment.db.username + ":" + environment.db.password +
    "@";
}

let db_url = "mongodb://" +
  db_credentials +
  environment.db.host + ":" + environment.db.port +
  "/?authSource=" + environment.db.authSource;

async function initDb(db) {
  if (await db.collection("users").count() < 1) { //if no user exists create admin user
    const userService = require("./services/user-service");
    const User = require("./models/User");
    const Role = require("./security/role");
    const adminPassword = environment.defaultAdminPassword;
    await userService.add(
      db,
      new User("admin", "", "admin", "", adminPassword, Role.ADMIN.name),
    );
    console.log("created admin user with password: " + adminPassword);
  }
}

async function connectMongoose() {
  let mongoose_db_url = "mongodb://" + db_credentials +
    environment.db.host + ":" + environment.db.port + "/" +
    environment.db.name + "?authSource=" + environment.db.authSource;

  const mongoose = require("mongoose");
  const Salesman = require("../models/Salesman");

  await mongoose.connect(mongoose_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((_) => console.log("Mongoose connected to database"))
    .catch((_) => console.log("Connection to database failed"));

  Salesman.createCollection()
    .then((_) => console.log("Collection created"));
}

exports.start = (app) => {
  return MongoClient
    .connect(db_url)
    .then(async (dbo) => { //connect to MongoDb
      const db = dbo.db(environment.db.name);
      await initDb(db); //run initialization function
      await connectMongoose() //run mongoose
      app.set("db", db); //register database in the express app
      app.listen(environment.port, () => { //start webserver, after database-connection was established
        console.log("Webserver started.");
      });
    });
};
