const express = require('express');
const bodyParser = require ("body-parser");

var https = require('https');
const { render } = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get('/', (req,res)=>{
    res.redirect('/home')
})

app.get('/home', (req,res)=>{
    res.render('home', { title: "Home"})
})

app.get('/pokemon_view/:id', async (req, res) => {
  const id = req.params.id;
  const url1 = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  try {
      const response1 = await fetch(url1);
      if (!response1.ok) {
          throw new Error('Pokemon not found');
      }
      const data1 = await response1.json();

      const response2 = await fetch(url2);
      if (!response2.ok) {
          throw new Error('Pokemon species not found');
      }
      const data2 = await response2.json();

      res.render('pokemon_view', { pokemon: data1 , species: data2 });
  } catch (error) {
      res.status(404).render('error',{title: 'error', em: error.message});
      res.status(500).render('error',{title: 'error', em: error.message})
  }
});


app.get('/search', async (req, res) => {
    const name = req.query.name;
    res.redirect("/pokemon_view/"+name);
  });

app.listen(5000,() =>{
    console.log("Listening to port 5000...");
})