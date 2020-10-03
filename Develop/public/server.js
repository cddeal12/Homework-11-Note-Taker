const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

// Set up express
const app = express();


// Set up the server
const PORT = 8080;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {

    // URL the request is being made to
    var path = req.url;
    console.log(path);

    // Handles the different url's used
    switch (path) {

        case "/notes":
            return fs.readFile(__dirname + "/notes.html", function(err, data) {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });

        case "*":
            return fs.readFile(__dirname + "/index.html", function(err, data) {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });

        case "/script.js":
            return fs.readFile(__dirname + "/script.js", function(err, data) {
                if (err) throw err;
                res.end(data);
            });

        default:
            return fs.readFile(__dirname + "/index.html", function(err, data) {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });
    };
};

server.listen(PORT, function() {
    console.log("Server is lisenting on PORT: " + PORT);
});