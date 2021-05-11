// Imports
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require("../apiRouter");

// Instantiate server
var server = express();

apiRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Bonjvour sur mon super server</h1>");
});

server.use("/api/", apiRouter);

// Launch server
server.listen(8081, function() {
  console.log("Server en écoute :)");
});
