// Author: Hunter Copening, Seth Perritt
// Date: October 28
// Purpose: This javascript file will be the server for our chat website, it will store chats and allow
// us to be reachable.


// modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());


// using mongo atlas
mongoose.connect('to be added later', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// serve static files
app.use(express.static('public_html'));


// mongo schema
// items
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    stat: String
});

// user
const userSchema = new Schema({
    username: String,
    password: String,
    listings: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    purchases: [{ type: Schema.Types.ObjectId, ref: 'item' }]
})

const item = mongoose.model('item', itemSchema);
const user = mongoose.model('user', userSchema);

// export for use in other files
module.exports = {item , user};


// running server at 3000
app.listen(80, () => {
    console.log(`Server is running on port 80`);
});
