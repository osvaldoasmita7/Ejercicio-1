const Server = require("./models/server");
var fs = require("fs");
var util = require("util");

require("dotenv").config();
const server = new Server();
server.execute();
var log_file = fs.createWriteStream(__dirname + "/node.log", { flags: "w" });
var log_stdout = process.stdout;
console.log = function (d) {
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};
