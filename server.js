var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

var app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("MongoDB connected successfully!");
  })
  .catch(function (error) {
    console.log("MongoDB connection error:", error);
  });


var productSchema = new mongoose.Schema({}, { strict: false });
var Product = mongoose.model("Product", productSchema, "products");
var reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
var Review = mongoose.model("Review", reviewSchema, "reviews");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/api/product", async function (req, res) {
  try {
    var product = await Product.findOne();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    var reviews = await Review.find();
    var averageRating = 0;

    if (reviews.length > 0) {
      var total = 0;
      for (var i = 0; i < reviews.length; i++) {
        total += reviews[i].rating;
      }
      averageRating = total / reviews.length;
    }
    var productData = product.toObject();
    productData.averageRating = Number(averageRating.toFixed(1));
    productData.totalReviews = reviews.length;
    res.json(productData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.get("/api/reviews", async function (req, res) {
  try {
    var reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.post("/api/reviews", async function (req, res) {
  try {
    var name = req.body.name;
    var rating = req.body.rating;
    var review = req.body.review;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (!review || !review.trim()) {
      return res.status(400).json({ message: "Review text is required" });
    }

    var newReview = new Review({
      name: name.trim(),
      rating: Number(rating),
      review: review.trim()
    });

    var savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", function () {
  console.log("Server is running");
});
