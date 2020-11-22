// express server use 
const path = require("path");

const express = require('express');

//middleware 
const bodyParser = require('body-parser');


//mongo db connect 
const mongoose = require('mongoose');

//board routings
const boardRoutes = require('./routes/board');
//user routings 
const userRoutes = require('./routes/user');


//instance
const app = express();


mongoose.connect(
    "mongodb+srv://projectStakeholder:" + process.env.MONGO_ATLAS_PW + "@resumeprojectcluster.oekdh.mongodb.net/resume-project?retryWrites=true&w=majority"
    )
    .then(()=>{
        console.log("mongodb connected with server successfully!");
    })
    .catch(()=>{
        console.log("Failed to connect mongodb.");
    })
//body parser    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
//절대경로로 / req 오면 angualr 폴더에 있는 내용을 연다. 
app.use("/", express.static(path.join(__dirname, "angular")))



// set headers 

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    // for using next middleware
    next();
});

//board routes module 
app.use("/resume/boards", boardRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) =>{
    res.sendFile(path.join(__dirname, "angular", "index.html"));
})

//export express module

module.exports = app;