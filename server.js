const express = require('express');
const bodyParser = require ("body-parser");
var https = require('https');
const { render } = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get('/home', (req,res)=>{
    res.render('home', { title: "Home"})
})

app.get('/pokemon_view/:id', async (req, res) => {
    const id = req.params.id;
    const url1 = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let data1;
    const response1 = await fetch(url1);
    data1 = await response1.json();
    let data2;
    const response2 = await fetch(url2);
    data2 = await response2.json();
    res.render('pokemon_view', { pokemon: data1 , species: data2});
});

app.post('/search', (req,res)=>{
    var id = req.body.id;
    res.redirect("/pokemon_view/"+id);
})


app.listen(5000,() =>{
    console.log("Listening to port 5000...");
})