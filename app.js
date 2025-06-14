console.log("web app.jsni boshlemiz");
const express = require("express")
const app = express();



//mongo db caqriw
const db = require("./server").db()
const mongodb = require("mongodb")


//kiriw qism
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//session qism
//views qism
app.set('views', 'views');
app.set('view engine', 'ejs');





//routing qism
// Home page
app.get("/", (req, res) => {
    res.render('gym');
})

// qishish
app.post("/qoshish", (req, res) => {
    console.log('NOur', req.body);
    const input1 = req.body.pathot;
    const input2 = req.body.son;
    db.collection("plans").insertOne({
        pathot: input1,
        son: input2
    }, (err, data) => {
        res.send("saqlandi")
    })
})







module.exports = app;