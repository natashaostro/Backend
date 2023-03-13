const path = require("path");
const fs = require("fs");
 
const loadRoutes = (app) => {
  // Get the path of the routes folder.
  const routesPath = path.join(__dirname, "../routes");

  // Get the files in the routes folder and remove the file extension.
  const routeFiles = fs.readdirSync(routesPath).map(file => path.parse(file).name);

  routeFiles.forEach((routeFile) => {
    const { name: slug } = path.parse(routeFile);
    const route = require(path.join(routesPath, routeFile));

    const routePath = slug.includes("views") ? "/" : `/api/${slug}`;
    return app.use(routePath, route);
  });
};

module.exports = loadRoutes;
