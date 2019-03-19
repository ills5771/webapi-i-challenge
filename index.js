const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

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

server.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({
        message: "The user could not be removed"
      });
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  db.update(id, user)

    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
