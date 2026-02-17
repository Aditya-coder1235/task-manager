const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes")
const userRoutes=require('./routes/userRoutes')


dotenv.config();
connectDB().then(()=>console.log("Connect to DB"))
.catch((err)=>console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true               
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
