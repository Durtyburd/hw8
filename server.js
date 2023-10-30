// Author: Hunter Copening, Seth Perritt
// Date: October 28
// Purpose: This javascript file is the server for our virtual marketplace

//Constant Variables, required modules
const express = require("express");
const app = express();
const port = 420;
const mongoose = require("mongoose");

//Connecting to MongoDB
mongoose.connect(
  "mongodb+srv://american924:monkeyBusiness@chattyapp.ycqodow.mongodb.net/"
);

//MongoDB Schemas
const Schema = mongoose.Schema;
const itemSchema = new Schema({ // item schema
  title: String,
  description: String,
  image: String,
  price: Number,
  status: String,
  username: String,
});
const userSchema = new Schema({// user schema
  username: String,
  password: String,
  listings: [{ type: Schema.Types.ObjectId, ref: "item" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "item" }],
});
// creating models for both schema
const Item = mongoose.model("item", itemSchema);
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.static("public_html"));
app.use(express.json());

//GET method for getting all users
app.get("/get/users/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET method for getting all items
app.get("/get/items/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET method for getting all listings for specific user
app.get("/get/listings/:username", async (req, res) => {
  const username = req.params.username;
  const userWithListings = await User.findOne({ username }).populate(
    "listings"
  );
  res.json(userWithListings.listings);
});

// GET method for getting all purchases for specific user
app.get("/get/purchases/:username", async (req, res) => {
  const username = req.params.username;
  const userWithPurchases = await User.findOne({ username }).populate(
    "purchases"
  );
  res.json(userWithPurchases.purchases);
});

// GET method for getting all users by keyword
app.get("/search/users/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log(keyword);
  const users = await User.find({
    username: { $regex: keyword, $options: "i" },
  });
  res.json(users);
});

// GET method for getting all items by keyword
app.get("/search/items/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const items = await Item.find({
    title: { $regex: keyword, $options: "i" },
  });
  res.json(items);
});

//POST method for adding a new user
app.post("/add/users/", async (req, res) => {
  const { username, password, listings, purchases } = req.body;
  const newEntry = new User({
    username: username,
    password: password,
    listings: listings,
    purchases: purchases,
  });
  await newEntry.save();
  res.json({ result: true });
});

//POST method for adding item to users listings
app.post("/add/items/:username", async (req, res) => {
  const username = req.params.username;
  const { title, description, image, price, status } = req.body;
  const newItem = new Item({
    title,
    description,
    image,
    price,
    status,
    username,
  });
  await newItem.save();
  await User.findOneAndUpdate(
    { username: username },
    { $push: { listings: newItem._id } } // adds the new item to the users listings
  );
});

// starting the server
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
