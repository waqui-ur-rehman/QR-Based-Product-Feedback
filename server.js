var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();

var app = express();

app.use(express.json());
app.use(express.static("public"));


// Review ka structure
var reviewSchema = new mongoose.Schema({

    name: String,
    rating: Number,
    review: String

});


// MongoDB mein Review collection
var Review = mongoose.model("Review", reviewSchema);


// Sab reviews get karna
app.get("/reviews", async function (req, res) {

    var reviews = await Review.find();

    res.json(reviews);

});


// New review add karna
app.post("/reviews", async function (req, res) {

    var newReview = new Review({

        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review

    });

    await newReview.save();

    res.json(newReview);

});


mongoose.connect(process.env.MONGO_URI)

    .then(function () {

        console.log("MongoDB connected successfully!");

    })

    .catch(function (error) {

        console.log("MongoDB connection error:", error);

    });


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
});
