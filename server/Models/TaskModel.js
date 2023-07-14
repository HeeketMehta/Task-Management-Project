const User = require("../Models/UserModel");
const mongoose = require("mongoose");



const TaskSchema = new mongoose.Schema({
    task_title: String,
    // description: String,
    priority: Number,
    hours: Number,
    category: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
  module.exports = mongoose.model("Task", TaskSchema);
// const TaskSchema = new mongoose.Schema({
//     task_title:{
//         type: String,
//         required: [true, "Your task needs to have a title"],
//         unique: true,
//     },
//     priority: {
//         type: Number,
//         required: [true, "Priority out of 10"],
//     },

//     category: {
//         type: String,
//         required: [true, "Category of the Task (e.g. Gym, Meeting)"],
//     },

//     hours: {
//         type: Number,
//         required: [true, "You need to specify number of hours"],
//     },


    
// })

// // task_title,priority,category,hours
// // userSchema.pre("save", async function (){
// //     this.password = await bcrypt.hash(this.password, 12);

// // })

// module.exports = mongoose.model("Task1", TaskSchema);