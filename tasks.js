const mongoose = require("mongoose");

const tasks = new mongoose.Schema({
    taskName: String,
    date: Date,
});


module.exports = mongoose.model("tasks", tasks);