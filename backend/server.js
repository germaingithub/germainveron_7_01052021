// Imports
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require("./apiRouter");
const cors = require("cors");
// Instantiate server
var server = express();
server.use(cors()); 

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
