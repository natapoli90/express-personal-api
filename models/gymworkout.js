var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GymWorkoutSchema = new Schema({
  name: String,
  type: String,
  duration: Number,
  muscleGroup: Array,
});

var GymWorkout = mongoose.model('GymWorkout', GymWorkoutSchema);

module.exports = GymWorkout;
