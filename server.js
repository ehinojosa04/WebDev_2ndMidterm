const express = require('express');
const bodyParser = require ("body-parser");
var https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");


app.get('/home',(req,res)=>{
    res.render('pokemon_view');
})

app.listen(5000,() =>{
    console.log("Listening to port 5000...");
})