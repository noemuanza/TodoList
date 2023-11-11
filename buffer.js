const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const clientPath = path.normalize(__dirname + "/client/");


const tasks = require("./tasks");

mongoose.connect(
  "mongodb://localhost:27017/tasks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);

app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(clientPath + "/index.html");
});

server.listen(1200, () => {
  console.log("Listening on port 1200");
});

app.use("/static", express.static("client"));




//getTasks();

async function getTasks() {

  let task = new tasks({taskName: "rangerChambre", date: '2002-10-2:10:10'});
  console.log(task);
  await task.save();

}