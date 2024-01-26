import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";

//set up express instace
const app = express();

//set up middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);

//import handlers
import handlerFunctions from "./controllor.js";

//ROUTES
app.get("/hello", handlerFunctions.sayHello);
app.get("/drinks", handlerFunctions.getAllDrinks);
app.post("/addDrink", handlerFunctions.addDrink);
app.delete("/deleteDrink/:id", handlerFunctions.deleteDrink);
//start up the server
app.listen(9009, console.log("Find me at http://localhost:9009"));
