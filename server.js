// Author: Hunter Copening, Seth Perritt
// Date: October 28
// Purpose: This javascript file is the server for our virtual marketplace


//Constant Variables
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

//Connecting to MongoDB
mongoose.connect(
  "mongodb+srv://american924:monkeyBusiness@chattyapp.ycqodow.mongodb.net/"
);

//MongoDB Schemas
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  status: String,
  username: String,
});
const userSchema = new Schema({
  username: String,
  password: String,
  listings: [{ type: Schema.Types.ObjectId, ref: "item" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "item" }],
});
const Item = mongoose.model("item", itemSchema);
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.static("public_html"));
app.use(express.json());

////////////
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Function to require authentication
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
///////////////////

//GET
app.get("/get/users/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/get/items/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/get/listings/:username", async (req, res) => {
  const username = req.params.username;
  const userWithListings = await User.findOne({ username }).populate(
    "listings"
  );
  res.json(userWithListings.listings);
});

app.get("/get/purchases/:username", async (req, res) => {
  const username = req.params.username;
  const userWithPurchases = await User.findOne({ username }).populate(
    "purchases"
  );
  res.json(userWithPurchases.purchases);
});

app.get("/search/users/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log(keyword);
  const users = await User.find({
    username: { $regex: keyword, $options: "i" },
  });
  res.json(users);
});

app.get("/search/items/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const items = await Item.find({
    title: { $regex: keyword, $options: "i" },
  });
  res.json(items);
});

//POST
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
    { $push: { listings: newItem._id } }
  );
});

////////////
// Sign-in route
app.post("/", async (req, res) => {
  // const { username, password } = req.body;
  const username = "seth";
  const password = "perritt";
  console.log("Received username:", username); // This will log the username to the console

  try {
    const user = await User.findOne({ username });
    console.log(user.password);
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials (Not a valid user)",
      });
    }
    const validPassword = "perritt" == user.password; // password, user.password
    console.log(validPassword);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (Not a valid password)" });
    }
    // Create a session to keep the user authenticated
    req.session.user = user;
    // Serve home.html after successful sign-in
    res.sendFile(__dirname + "/public_html/home.html");
  } catch (err) {
    console.error("Error during authentication:", err.message);
    res.status(500).send("An error occurred during authentication");
  }
});

////////////

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
