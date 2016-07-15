var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "https://warm-bastion-71807.herokuapp.com/");

// module.exports.Campsite = require("./campsite.js.example");
