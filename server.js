require("dotenv").config()
const express = require("express");
// const morgan = require("morgan") 
const PORT = process.env.PORT
const app = express() 
// const pokemon  = require('./models/pokemon.js');
const pokemon = require("./models/pokemon.js");

// app.use(morgan("dev"))
// app.use(express.static("public"))


// routes

// INDEX
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {pokemon});
    });

// new

//destory

// update

//create

//edit

//show
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    const pokemonInfo = pokemon[id]
    res.render("show.ejs", {pokemon, pokemonInfo, id});
    });


// Listener
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})