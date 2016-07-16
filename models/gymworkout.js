var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GymworkoutSchema = new Schema({
  name: String,
  photo: String,
  week: Number,
  level: String,
  motivation: String
});

var Gymworkout = mongoose.model('Gymworkout', GymworkoutSchema);

module.exports = Gymworkout;
