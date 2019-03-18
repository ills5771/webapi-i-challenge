// implement your API here

const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", (req, res) => {
  const hobbits = [
    {
      name: "Jane Doe",
      bio: "Not Tarzan's Wife, another Jane"
    }
  ];

  res.status(200).json(hobbits);
});

server.listen(8000, () => console.log("API running on port 8000"));
