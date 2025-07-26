const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");


app.use(express.json())

app.use(cors({
   origin: process.env.ORIGIN,
   credentials:true,
}))
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.DATABASE_URL).then(()=> {
    app.listen(process.env.PORT,()=> {
        console.log(`Server ready to take off ${process.env.PORT} `);
        
    })
}).catch((err) => {
    console.log(err);
    
})


