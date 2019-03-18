// implement your API here

const express = require("express");
const db = require("./data/db.js");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
