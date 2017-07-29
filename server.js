const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const fs = require('fs');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { 'extensions': ['html'] }));


app.get('/', function(req, res) {
    const filePath = __dirname + '/data/posts.json';
    const callbackFunction = function(error, file) {
        // we call .toString() to turn the file buffer to a String
        const fileData = file.toString();
        // we use JSON.parse to get an object out the String
        const postsJson = JSON.parse(fileData);
        // send the json to the Template to render
        res.render('index', {
            title: 'Etzali Profile', // insert your name instead
            posts: postsJson
        });
    };
    fs.readFile(filePath, callbackFunction);
});


app.get("/main", function(req, res) {
    res.render("main", {
        title: "<h1 style='color:white'>Main Page</h1>",
        subheading: "<h3 style='color:blue;'>Main subheading</h3>"
    })
});

app.get("/admin", function(req, res) {
    res.render("admin", {
        title: "<h2 style='color:white'>Khaled'blog</h2>",
        subheading: "<h3 style='color:gold;'>Admin subheading</h3>"
    })
});

app.get("/my-cv", function(req, res) {
    res.render("my-cv", {
        title: "<h2 style='color:white'>CV Page</h2>",
        subheading: "<h3 style='color:blue;'>Main subheading</h3>"

    })
});

app.get("/contact", function(req, res) {
    res.render("contact", {
        color: "orange",
        subheading: "<h3 style='color:yellow;'>Contatnt subheading</h3>"
    })
});


// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});