const express = require('express');
const bodyParser = require ("body-parser");
var https = require('https');
const { render } = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");


app.get('/', (req,res) => {
    res.render('home')
})

app.get('/pokemon_view/:id', async (req, res) => {
    const id = req.params.id;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let data;
    const response = await fetch(url);
    data = await response.json();
    res.render('pokemon_view', { pokemon: data });
});


app.listen(5000,() =>{
    console.log("Listening to port 5000...");
})