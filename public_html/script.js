// Author: Hunter Copening, Seth Perritt
// Date: October 28
// Purpose: This javascript file will take care of the webpages general functionality by updating
// changes in real time onto the marketplace


//Constants
const username = document.getElementById("username");
const password = document.getElementById("password");
const userSubmit = document.getElementById("userSubmit");
const userSubmitLogin = document.getElementById("userSubmit_login");
const usernameLogin = document.getElementById("username_login");
const passwordLogin = document.getElementById("password_login");
const title = document.getElementById("title");
const description = document.getElementById("description");
const image = document.getElementById("imageName");
const price = document.getElementById("price");
const status = document.getElementById("status");
const usernameItem = document.getElementById("usernameItem");
const itemSubmit = document.getElementById("itemSubmit");
const item = document.getElementById("item");

//User Submit - add user
async function submitUser(e) {
  e.preventDefault();
  const user = {
    username: username.value,
    password: password.value,
    listings: [],
    purchases: [],
  };

  const res = await fetch("/add/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  newUserCreated();
}

//Item Submit - add item
async function submitItem(e) {
  e.preventDefault();
  const item = {
    title: title.value,
    description: description.value,
    image: image.value,
    price: price.value,
    status: "SALE",
    username: usernameItem.value,
  };

  const res = await fetch(`/add/items/${usernameItem.value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (res.ok) {
    window.location.href = "home.html";
  } else {
    console.error("Failed to submit item:", res.statusText);
  }
}

//Creates new user (just an alert basically)
function newUserCreated() {
  alert("User Created");
  password.value = "";
  username.value = "";
}

//Event listener for form submit buttons
userSubmit.addEventListener("click", submitUser);
item.addEventListener("click", submitItem);

////

////

////

////

////

////

////

////

////

////

async function performSignIn(e) {
  e.preventDefault(); // prevent the default form submission behavior

  const auth = {
    username: usernameLogin.value,
    password: passwordLogin.value,
  };

  console.log(auth);
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth), // convert the auth object into a JSON string
    });

    // Here, handle the response accordingly
    if (response.ok) {
      const data = await response.json(); // or handle other response types if necessary
      console.log(data);
      // handle redirection if necessary, or other logic upon successful response
    } else {
      // handle errors, for example, show a message to the user
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
  test();
}

function test() {
  alert("hello");
  console.log("hello");
}

userSubmitLogin.addEventListener("click", performSignIn);

//////////
