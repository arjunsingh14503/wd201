const http = require("http");
const fs = require("fs");

const args = require('minimist')(process.argv.slice(2));

let HC = "";
let PC = "";
let RC = "";

fs.readFile("./home.html", (err, home) => {
  if (err) {
    throw err;
  }
  HC = home;
});

fs.readFile("./project.html", (err, project) => {
  if (err) {
    throw err;
  }
  PC = project;
});
fs.readFile("./registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  RC = registration;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(PC);
        response.end();
        break;
      case "/registration":
        response.write(RC);
        response.end();
        break;
      default:
        response.write(HC);
        response.end();
        break;
    }
  }).listen(args.port);