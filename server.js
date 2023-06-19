require("dotenv").config()
const express = require("express");
// const morgan = require("morgan") 
const PORT = process.env.PORT
const app = express() 
// const pokemon  = require('./models/pokemon.js');
const pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override")

// app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride("_method"))



// routes

// INDEX
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {pokemon});
    });

// new
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})
//destory

// update
app.put("/pokemon/:id", (req, res) => {
    const id = req.params.id
    pokemon[id] = req.body
    res.redirect("/pokemon")
})

//create
app.post("/pokemon", (req, res) => {
  let newPokemon = {
    name: req.body.name,
    img: req.body.image,
  }  
  newPokemon.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
  }
  pokemon.push(req.body)
  res.redirect("/pokemon")
})
//edit
app.get("/pokemon/:id/edit", (req, res) => {
    const id = req.params.id
    const pokemonInfo = pokemon[id]
    res.render("edit.ejs", {pokemonInfo, id})
})

//show
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    const pokemonInfo = pokemon[id]
    res.render("show.ejs", {pokemonInfo, id});
    });


// Listener
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})