var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GymWorkoutSchema = new Schema({
  name: String,
  photo: String,
  week: Number,
  level: String,
  motivation: String,
});

var GymWorkout = mongoose.model('GymWorkout', GymWorkoutSchema);

module.exports = GymWorkout;
