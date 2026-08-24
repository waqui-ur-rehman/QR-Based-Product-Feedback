var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

var app = express();

app.use(express.json());


app.use(express.static(__dirname));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});


mongoose.connect(process.env.MONGO_URI)

    .then(function () {
       console.log("MongoDB connected successfully!");

    })
    .catch(function (error) {
        console.log("MongoDB connection error:", error);

    });

app.listen(process.env.PORT || 3000, "0.0.0.0", function () {

    console.log("Server is running");

});
