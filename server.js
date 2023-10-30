// Author: Hunter Copening, Seth Perritt
// Date: October 28
// Purpose: This javascript file will be the server for our chat website, it will store chats and allow
// us to be reachable.


//Constant Variables
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

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
});

const userSchema = new Schema({
  username: String,
  password: String,
  listings: [{ listing:{ type: Schema.Types.ObjectId, ref: "item" }}],
  purchases: [{ purchase:{ type: Schema.Types.ObjectId, ref: "item" }}],
});

const Item = mongoose.model("item", itemSchema);
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.static("public_html"));
app.use(express.json());

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

app.get("/get/listings/USERNAME", (req, res) => {}); //username can vary
app.get("/get/purchases/USERNAME", (req, res) => {}); //username can vary
app.get("/search/users/KEYWORD", (req, res) => {}); //keyword can vary
app.get("/search/items/KEYWORD", (req, res) => {}); //keyword can vary

//POST
app.post("/add/users/", async (req, res) => {
  const { username, password } = req.body;
  const newEntry = new User({
    username: username,
    password: password,
  });
  await newEntry.save();
  res.json({ result: true });
});

app.post("/add/item/USERNAME", (req, res) => {
  // const { username, password } = req.body;
  // const newEntry = new User({
  //   username: username,
  //   password: password,
  // });
  // await newEntry.save();
  // res.json({ result: true });
}); //username can vary

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
