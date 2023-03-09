const path = require("path");
const { create } = require("express-handlebars");

const hbsConfig = (app) => {
  const hbs = create({
    partialsDir: [path.join(__dirname, "../views/partials")]
  });

  app.engine("handlebars", hbs .engine);
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "handlebars");
};

module.exports = hbsConfig;