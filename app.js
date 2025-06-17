const express = require('express');
const app = express();


// MongoDB connect
const db = require('./server');
const mongodb = require('mongodb');

// 1: Kirish code
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// 3: Views code
app.set('views', 'views');
app.set('view engine', 'ejs');


// 4: Routing code

// Home page
app.get('/', (req, res) => {
    res.render('gym');
});

// Create item
app.post('/create-item', (req, res) => {
    console.log(req.body);
    const workout = req.body
    db.collection('workout').insertOne({
        workoutPlan: workout.workoutPlan,
        workoutDay: workout.workoutDay,
        workoutType: workout.workoutType
    }, (err, data) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: "Failed to create item." });
          }
        res.json(data.ops[0]);
    })
});




module.exports = app;