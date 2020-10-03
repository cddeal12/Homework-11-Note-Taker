// [ { "title": "test", "text": "testtext", "id": 1 } ]
// Requirements
const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

// Json file
let db = [];
fs.readFile("../db/db.json", "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
    db.push(data);
    db = db[0];
    console.log(db);
});

// Set up express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the server
const PORT = 8080;

// Routes
// ====================================================
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/script.js", function(req, res) {
    res.sendFile(path.join(__dirname, "script.js"))
});

app.get("/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "styles.css"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API Routes
// ====================================================
app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    let nextId = db.length + 1;

    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: nextId
    };
    console.log(newNote);
    db.push(newNote);
    console.log(db);
    fs.writeFile("../db/db.json", db, function(err) {
        if (err) throw err;
        console.log("Added note successfully")
    });
});

app.delete("/api/notes/:id", function(req, res) {
    let chosen = req.params.id;

    for (let i=0; i<db.length; i++) {
        if (chosen == db[i].id) {
            db.splice(i, 1);
        }
    }

    fs.writeFile("../db/db.json", db, function(err) {
        if (err) throw err;
        console.log("Deleted note successfully");
    })
});



app.listen(PORT, function() {
    console.log("App is lisenting on PORT: " + PORT);
});