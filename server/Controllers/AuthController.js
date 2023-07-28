const User = require("../Models/UserModel")
const Task = require("../Models/TaskModel")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

const url = require('url');
const querystring = require('querystring');




module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.json({ message: "User already exists" });
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
        next();

    }
    catch (error) {
        console.error(error);
    }

};




module.exports.Login = async (req, res, next) => {
    try{
        
        const { email, password } = req.body;


        // No email or password provided
        if (!email || !password){
            return res.json({message:'All fields are required'});
        }

        // Find the user
        const user = await User.findOne({ email });
        
        // No user found
        if(!user){
            return res.json({message:'Incorrect password or email' }) 
        }
        
        //Authenticate user
        const auth = await bcrypt.compare(password,user.password)

        
        // Password Not matched
        if (!auth) {
            return res.json({message:'Incorrect password or email' }) 
          }
        
        const token = createSecretToken(user._id);
        // console.log(token);
        res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
        });

        res.status(201).json({ message: "User is logged in successfully", success: true, user: user });
        next()


    }
    catch (error){
        console.error(error);
    }
} 






module.exports.createTask = async (req, res) => {
    try {


        const { task_title, priority, category, hours, email } = req.body;


        const existingUser = await User.findOne({ email }, { email: 1, password: 1})




        // console.log("IN THE CREATE TASK SERVER FUNCTION")
        const task = await Task.create({
            task_title,
            priority,
            category,
            hours, 
            email,
            user: existingUser,
        });



        res.status(201).json(task);
        
    }
    catch (error) {
        console.log("Unable to create task")
        res.status(500).json({ error: 'Unable to create task' });
    }

};



module.exports.Dashboard = async (req, res) => {
    try {
        console.log("IN THE SERVER SIDE OF THE DASHBOARD FUNCTION")
        const user_email = req.params.email
        console.log(req.params.email)


        const existingUser = await User.findOne({ email: user_email })
        // const { userId } = req.user; // Assuming you have the authenticated user's ID in the req.user object
    
        // Fetch tasks associated with the user
        console.log("THE EXISTING USER IS ---- ", existingUser);
        const tasks = await Task.find({user:existingUser});
        console.log(tasks)
        res.status(200).json(tasks);
      } 
      catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
      }
    };
    