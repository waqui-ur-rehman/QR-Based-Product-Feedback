QR Based Customer Feedback System
Project Overview

The QR Based Customer Feedback System is a web application that allows customers to give feedback about a product by scanning a QR code placed on the product packaging.
After scanning the QR code, the customer is taken to a product feedback page where they can view product information, see reviews from other customers, and submit their own review without creating an account or logging in.
The submitted reviews are stored in MongoDB Atlas and can be retrieved and displayed on the product feedback page.

Problem

Companies need direct feedback from customers to understand what they think about their products. At the same time, new customers may want to see real customer experiences before purchasing a product.
This project provides a simple connection between the company and customers through a QR code. Customers can easily submit reviews, while companies can use the feedback to understand customer opinions and improve their products.

Main Features
QR-based access to the product feedback page
Product information display
Customer reviews display
Customers can submit reviews without login
Star rating system
Customer name and review submission
Reviews are stored in MongoDB Atlas
Reviews are loaded from the database and displayed on the page
Responsive and simple user interface
How It Works
Customer scans QR Code
        ↓
Product Feedback Page Opens
        ↓
Customer views Product Details
        ↓
Customer views Previous Reviews
        ↓
Customer submits Name, Rating and Review
        ↓
Express.js Backend
        ↓
MongoDB 
        ↓
Review is Saved
        ↓
Review is Displayed on the Page

Technologies Used
Frontend
HTML
CSS
JavaScript
Backend
Node.js
Express.js
Database
MongoDB Atlas
Mongoose
Other
QR Code
GitHub

Future Improvements

The project can be extended in the future with features such as:

Admin dashboard for managing reviews
Multiple product pages
Product-specific QR codes
Review search and filtering
Review moderation
Company login and dashboard
Product images and additional product information

Project Purpose
The purpose of this project is to provide a simple and practical way for companies to collect customer feedback while helping new customers make better purchasing decisions through real customer reviews.
