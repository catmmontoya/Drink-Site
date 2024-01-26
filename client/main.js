const drinkDisplay = document.querySelector("#drinkDisplay");
const drinkForm = document.querySelector("form");

//want to create "cars" for each drink from our database
//assume that this function will be called passing in a drink object from database
const createDrinkCard = (drinkObj) => {
  //create a new element
  const newDrinkCard = document.createElement("section");
  //add class name of drink card
  newDrinkCard.className = "drinkCard";
  //add some inner HTML
  newDrinkCard.innerHTML = `
  <img src=${drinkObj.picture} />
  <p>${drinkObj.name}</p>

  
  <section>
    <button onclick="updateDrink(${drinkObj.id}, 'downvote)">-</button>
    Popularity: ${drinkObj.votes}
    <button onclick="updateDrink(${drinkObj.id}, 'upvote')">+</button>
    </section>

    <br/>

    <button onclick="deleteDrink(${drinkObj.id})">Delete Me</button>
    `;

  console.log(newDrinkCard);

  drinkDisplay.appendChild(newDrinkCard);
};

const displayAllDrinks = (drinkArr) => {
  //create function that takes in an array of objects from database and invokes createDrinkCard
  for (let i = 0; i < drinkArr.length; i++) {
    //at each iteration pass in the function that diaplays a card
    createDrinkCard(drinkArr[i]);
  }
};

const getAllDrinks = () => {
  axios.get("/drinks").then((res) => {
    displayAllDrinks(res.data.allDrinks);
  });
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  let name = document.getElementById("drinkName");
  let drinkImg = document.getElementById("drinkImg");

  let bodyObj = {
    drinkName: name.value,
    drinkPic: drinkImg.value,
  };

  drinkDisplay.innerHTML = "";
  name.value = "";
  drinkImg.value = ""; // makes it so the placeholder shows again instaed of the last drink they put in

  axios.post("/addDrink", bodyObj).then((res) => {
    displayAllDrinks(res.data.allDrinks);
  });
};

//function to delete a drink
const deleteDrink = (id) => {
  //send an axios delete request including the id as a req param
  axios.delete(`/deleteDrink/${id}`).then((res) => {
    //clear drinkDisplay div and repopulate by calling displayAllDrinks()
    drinkDisplay.innerHTML = "";
    displayAllDrinks(res.data.allDrinks);
  });
};

//function to update the popularity votes of a drink
//this function should accept both the drinks id and whether we are upvoting/downvoting
const updateDrink = (id, type) => {};

//add an evebt listener to drink form to fire a function (handleSubmit) when submitted
drinkForm.addEventListener("submit", handleSubmit);

getAllDrinks();
