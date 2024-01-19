const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const clientPath = path.normalize(__dirname + "/client/");
app.use(express.static(clientPath));
let taskList = [];

const taskSchema = new mongoose.Schema({
  name: String,
  date__: {
    day: Number,
    month: Number,
    year: Number
  },
  time__: {
    hour: Number,
    minute: Number
  }
});

const tasks = mongoose.model('Task', taskSchema);


//const tasks = require("./tasks");

mongoose.connect(
  "mongodb+srv://yegorski:tonyparker9@cluster0.4saond9.mongodb.net/",
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



app.get("/", (req, res) => {
  res.sendFile(clientPath + "/index.html");
});

server.listen(1200, () => {
  console.log("Listening on port 1200");
});

app.use("/static", express.static("client"));


//const tasks = require('./tasks')
const displaytasks =  async () => {
   taskList = await tasks.find();
  console.log(taskList);
};

displaytasks();

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("tasks", taskList);
  socket.on("taskAdd", (task) => {
    console.log(task);

    // Create a new task using the received data
    const newTask = new tasks({
      name: task.taskName,
      date__: task.taskDate,
      time__: task.taskTime,
    });
    taskList.push(newTask);
    // Save the new task to the database
    newTask.save((err, savedTask) => {
      if (err) {
        console.error("Error saving task:", err);
      } else {
        // Log the complete saved task object
        console.log("New task added:", savedTask);
      }
      socket.emit("tasks", taskList);
    });
  });

});


