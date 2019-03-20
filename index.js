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

server.get("/users/:id", async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
  }
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
server.delete("/users/:id", async (req, res) => {
  try {
    const user = await db.remove(req.params.id);
    if (user > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.name && user.bio) {
    db.update(id, user)

      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "The user information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
