exports.default = () => {
  if (process.env.NODE_ENV === "development") {
    return require("../../environments/environment.js").default;
  }
  return require("../../environments/environment.prod.js").default;
};
