require("dotenv").config();

const path = require("path");

const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "/build")));

const server = require("http").Server(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
