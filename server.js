// require express and other modules
var express = require('express'),
    app = express();
var mongoose = require('mongoose');
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/
var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//Show my profile
app.get('/api/profile', function (req, res) {
  db.Profile.find(function(err, data){
  if (err) {
    return console.log("Error: ", err);
  }
  res.json(data);
  });
});
//Show all gymworkouts
app.get('/api/gymworkouts', function (req, res) {
  db.Gymworkout.find(function(err, gymworkouts){
    if (err) {
      return console.log("Error: ", err);
    }
    res.json(gymworkouts);
  });
});
//Show one gymworkout by id
app.get('/api/gymworkouts/:id', function (req, res) {
  console.log ('show gymworkouts with this index: ', req.params);
  db.Gymworkout.findOne({_id: req.params.id}, function(err, gymworkout) {
    if (err) {
      return console.log("Error: ", err);
    }
    res.json(gymworkout);
  });
});
// Create new gymworkout
app.post('/api/gymworkouts', function (req, res) {
  var newGymworkout = new db.Gymworkout(req.body);
  newGymworkout.save(function handleSaved (err, savedGymworkout) {
    if (err) {
      return console.log("Error: ", err);
    }
    else {
    res.json(savedGymworkout);
  }
  });
});

//Update a trip
app.put('/api/gymworkouts/:id', function(req, res) {
  console.log('gymworkout to update:', req.params);
  var gymworkoutId = req.params.id;
  db.Gymworkout.findOne({_id: gymworkoutId}, function (err, changedGymworkout) {
    if (err) {
      return console.log("Error: ", err);
    }
    changedGymworkout.name = req.body.name;
    changedGymworkout.photo = req.body.photo;
    changedGymworkout.week = req.body.week;
    changedGymworkout.level = req.body.level;
    changedGymworkout.motivation = req.body.motivation;
    changedGymworkout.save(function(err, savedWorkout) {
      if (err) {
        return console.log("Err", err);
      }
      res.json(savedWorkout);
    });
  });
});

//Delete a gymworkout
app.delete('/api/gymworkouts/:id', function (req, res) {
  console.log('gymworkout to delete:', req.params);
  var gymworkoutId = req.params.id;
  db.Gymworkout.findOneAndRemove({_id: gymworkoutId}, function (err, deletedGymworkout) {
    if (err) {
      return console.log("Error: ", err);
    }
    res.json(deletedGymworkout);
  });
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/natapoli90/express-personal-api",
    base_url: "https://warm-bastion-71807.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Json data about me"},
      {method: "GET", path: "/api/gymworkouts", description: "Json data about best gymworkouts"},
      {method: "GET", path: "/api/gymworkouts/:id", description: "Uses ID to find Json data about one gymworkout"},
      {method: "POST", path: "/api/gymworkouts", description: "Uses a form on index.html to add one record to my gymworkouts database"},
      {method: "PUT", path: "api/gymworkouts/:id", description: "Updates one gymworkout found by ID"},
      {method: "DELETE", path: "/api/gymworkouts/:id", description: "Deletes one gymworkout, found by ID"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
