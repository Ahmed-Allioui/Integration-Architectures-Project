exports.config = (app, express) => {
  useJsonEncodedBodies(app, express);
  useUrlEncodedBodies(app, express);
  useMultipartBodies(app);
  useCookieSession(app);
  useCors(app);
  useApiRouter(app);
};

const useJsonEncodedBodies = (app, express) => {
  app.use(express.json()); //adds support for json encoded bodies
};

const useUrlEncodedBodies = (app, express) => {
  app.use(express.urlencoded({ extended: true })); //adds support db_url encoded bodies
};

const useMultipartBodies = (app) => {
  const multer = require("multer");
  const upload = multer();
  app.use(upload.array()); //adds support multipart/form-data bodies
};

const useCookieSession = (app) => {
  const cookieSession = require("cookie-session");
  const crypto = require("crypto");
  app.use(cookieSession({
    secret: crypto.randomBytes(32).toString("hex"),
    sameSite: false,
    secure: false,
    httpOnly: false,
  }));
};

const useCors = (app) => {
  const environment = require("./env").default();
  const cors = require("cors");
  app.use(cors({
    origin: environment.corsOrigins,
    credentials: true,
  }));
};

const useApiRouter = (app) => {
  const apiRouter = require("../routes/api-routes"); //get api-router from routes/api
  app.use("/api", apiRouter); //mount api-router at path "/api"
};
