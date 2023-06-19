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
app.delete("/pokemon/:id", (req, res) => {
    // grab the id from the url
    const id = req.params.id
    // splice the object out of the array
    pokemon.splice(id, 1)
    
    // redirect user back to index
    res.redirect("/pokemon")
  })
// update
app.put("/pokemon/:id", (req, res) => {
    const id = req.params.id
    let editPokemon = pokemon[id]
    editPokemon.name = req.body.name
    editPokemon.type = req.body.type
    editPokemon.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense
    }
    pokemon[id] = editPokemon
    
    res.redirect("/pokemon")
})

//create
app.post("/pokemon", (req, res) => {
  let newPokemon = {
    name: req.body.name,
    id: req.body.id,
    img: req.body.image || "/images.jpeg"
  }  
  newPokemon.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
  }
  pokemon.push(newPokemon)
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