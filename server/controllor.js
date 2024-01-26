import drinks from "./db.json" assert { type: "json" };
//"drinks" isn't matched with another "drinks" it's what you're calling the array in db.json

let globalId = 4;

const handlerFunctions = {
  sayHello: (req, res) => {
    res.send({
      message: "Hello there",
    });
  },

  getAllDrinks: (req, res) => {
    res.send({
      message: "Here are the drinks",
      allDrinks: drinks,
    });
  },
  addDrink: (req, res) => {
    //grab the drink name and picture from the post request object (body)
    const drinkName = req.body.drinkName;
    const drinkPic = req.body.drinkPic;
    //create a new drink object, passing in the values from the req body
    const newDrink = {
      id: globalId,
      name: drinkName,
      picture: drinkPic,
      votes: 0,
    };
    //add the new drink obkect to our drink array (drinks) in db.json
    drinks.push(newDrink);
    globalId++;

    res.send({
      message: "Drink added successfully",
      allDrinks: drinks,
    });
  },

  deleteDrink: (req, res) => {
    //grab a drink's id from req.params objects
    const drinkId = req.params.id;
    //find the drink object with the matching id from our drinks array
    for (let i = 0; i < drinks.length; i++) {
      //if a drink's id is a match then we will delete it with a .splice method
      if (drinks[i].id === +drinkId) {
        drinks.splice(i, 1);
        break;
      }
    }
    res.send({
      message: "Drink deleted",
      allDrinks: drinks,
    });
  },

  updateDrink: (req, res) => {
    //grab the id from req.params
    const drinkId = req.params.id;
    //grab the type(upvote/downvote) from req.body
    const voteType = req.body.voteType;

    //grab the index of the drink using its id and the 'findIndex' array method
    const drinkIdx = drinks.findIndex((drink) => {
      return (drink.id = +drinkId);
    });
    //based on voteType, either increment or decrement the drink.votes property
    if (voteType === "upvote") {
      drinks[drinkIdx].votes += 1;
    } else if (voteType === "downvote") {
      drinks[drinkIdx].votes -= 1;
    }

    //send a response with all drinks again (drinks array will now have the new vote vaule as the drink)
    res.send({
      message: "Vote count updated",
      allDrinks: drinks,
    });
  },
};

export default handlerFunctions;
