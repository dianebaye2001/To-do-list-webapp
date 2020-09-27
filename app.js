const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //to call the local module that we created

const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// setting up ejs
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    let day = date.getDay();
   
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {
    let item = req.body.newItem;

    if(req.body.list === "Work")  {
        workItems.push(item);
        res.redirect("/work");


    } else {
        items.push(item);
        res.redirect("/");
    }
 
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(3000, function() {
    console.log("Currently listening at port 3000");
})