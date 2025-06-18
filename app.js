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
app.get('/', function(req, res){
    db.collection('workout')
        .find()
        .toArray((err, data) => {
            if(err){
                console.log(err);
                res.end("something wnet wrong");
            } else {
                res.render('gym', {items: data});
            }
    });
});

// Create item
app.post('/create-item', (req, res) => {
    console.log(req.body);
    const workout = req.body
    db.collection('workout').insertOne({
        muscleGroup: workout.muscleGroup,
        trainingType: workout.trainingType,
        workoutSets: workout.workoutSets,
        workoutReps: workout.workoutReps,
        completed: false
    }, (err, data) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: "Failed to create item." });
          }
        res.json(data.ops[0]);
    })
});

// Checkbox
app.post('/checkbox-item', (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  console.log(req.body)
  db.collection('workout').updateOne(
    { _id: new mongodb.ObjectId(id) },
    { $set: { completed: completed } },
    (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      res.json({ success: true });
    }
  );
});

// Delete item
app.post('/delete-item', (req, res) =>{
    const id = req.body.id;
    db.collection('workout').deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data){
      if (err) return res.status(500).json({ error: "Delete failed" });
        res.json({state: 'done'});
    })
})

// Delete-all
app.post('/delete-all', (req, res) => {
    db.collection('workout').deleteMany({}, (err, data) => {
      if (err) return res.status(500).json({ error: "Delete-all failed" });
      res.json({success: "done"});
    });
})



module.exports = app;