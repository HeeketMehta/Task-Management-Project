const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoute = require("./Routes/AuthRoute");
const cookieParser = require("cookie-parser");

const PORT = 5050;
const MONGO_URL = "mongodb+srv://task_manager:pass@cluster0.66uuoq3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.get('/test', (req, res) => {
//   res.json(req.user);
// });

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
// app.use(express.json());

// app.listen(PORT, () =>{
//     console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
// })