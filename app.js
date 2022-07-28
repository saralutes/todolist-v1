// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// require the custom date module
const date = require(__dirname + "/date.js");

const app = express();

const items=[];
const workItems=[];
const errands=[];

// to make ejs work
app.set('view engine', 'ejs');

// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// to make stylesheets/images/static files work
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
})

app.get("/", function(req, res){

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

// app.get("/", function(req, res){

//     let day = date.getDate();

//     res.render("list", {
//         listTitle: day,
//         newListItems: items
//     });
// });
app.get("/work", function(req, res){

    res.render("list", {
        listTitle: "Work",
        newListItems: workItems
    });
});
app.get("/home", function(req, res){

    res.render("list", {
        listTitle: "Home",
        newListItems: items
    });
});

app.get("/errands", function(req, res){

    res.render("list", {
        listTitle: "Errands",
        newListItems: errands
    });
});

app.post("/", function(req, res){
    
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } if (req.body.list === "Errands") {
        errands.push(item);
        res.redirect("/errands"); 
    } else {
        items.push(item);
        res.redirect("/home");
    }
});

app.post("/return", function(req, res){
    res.render("index");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
});