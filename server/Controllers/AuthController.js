const User = require("../Models/UserModel")
const Task = require("../Models/TaskModel")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");


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

        res.status(201).json({ message: "User logged in successfully", success: true });
        next()


    }
    catch (error){
        console.error(error);
    }
} 






module.exports.createTask = async (req, res) => {
    try {
        console.log("SPOT1")
        console.log(req.body)
        const { task_title, priority, category, hours } = req.body;
        console.log(task_title)
        // console.log(req.user)
        // console.log(req.cookies)
       
        // // TRIAL FOR USER VERIFICATION
        // const token = req.cookies.token;
        // if (!token) {
        //     return res.json({ status: false })
        // }
        // jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        // if (err) {
        //     return res.json({ status: false })
        // }
        // else{
        //     const user = await User.findById(data.id);
        //     if (user) return res.json({ status: true, user: user.username, email: user.email })
        //     else return res.json({ status: false })
        //     }
        // })






        // // const { userId } = req.user; // Assuming you have the authenticated user's ID in the req.user object
        // const params = JSON.parse(req)
        // console.log(params)
        // userId = params.id;
        // const user = await User.findById(userId).select("-password");
        // console.log(userId)
        console.log("IN THE CREATE TASK SERVER FUNCTION")
        const task = await Task.create({
            task_title,
            priority,
            category,
            hours,  
            // user: userId,
        });

        res.status(201).json(task);
        
    }
    catch (error) {
        console.log("Unable to create task")
        res.status(500).json({ error: 'Unable to create task' });
    }

};
