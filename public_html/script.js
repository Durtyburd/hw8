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
    // redirect if everything works
    if (res.ok) {
      
      window.location.href = 'home.html';
    } else {
      // throw error if item doesnt submit correctly
      console.error('Failed to submit item:', res.statusText);
    }
}

function newUserCreated() {
  alert("User Created");
  password.value = "";
  username.value = "";
}

//Event listener for form submit buttons
userSubmit.addEventListener("click", submitUser);
itemSubmit.addEventListener("click", submitItem);

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

// Example client-side JavaScript code using fetch API to handle sign-in
async function performSignIn(e) {
  e.preventDefault();

  const auth = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    if (response.ok) {
      // If the sign-in was successful, reload the page to reflect the change
      window.location.reload();
    } else {
      // If sign-in was not successful, handle errors here
      const errorText = await response.text();
      alert(errorText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Assuming you want to add this to a click event on a button with the id 'signInButton'
userSubmitLogin.addEventListener("click", performSignIn);

//////////
