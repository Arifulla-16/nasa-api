const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
});

app.get("/apod",(req,res)=>{
    res.sendFile(__dirname+"/apod.html");
});

app.get("/neows",(req,res)=>{
    res.sendFile(__dirname+"/neows.html");
});

app.get("/rovimg",(req,res)=>{
    res.send("Mar'Rov");
});

app.listen(3000,()=>{
    console.log("started at 3000");
});