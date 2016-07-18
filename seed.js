// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var profile = {
  name: "Natalia Polishcuk",
  github_link: "https://github.com/natapoli90",
  github_profile_image: "https://avatars3.githubusercontent.com/u/19023007?v=3&s=460",
  current_city: "San Francisco",
  pets: [{name: "Mika", type: "Cat", age: "7"}]
};

var gymworkouts_list = [
{
  name: "Black Canary",
  photo: "/images/1blackcanary.jpg",
  week: 1,
  level: "Beginner",
  motivation: "Today is your tomorrow.  A 1 hour workout is 4% of your day."
},
{
  name: "Cat Woman",
  photo: "/images/2catwoman.jpg",
  week: 2,
  level: "Beginner",
  motivation: "First you feel like dying. Then you feel reborn."
},
{
  name: "Wonder Woman",
  photo: "/images/3wonderwoman.jpg",
  week: 3,
  level: "Intermediate",
  motivation: "When you feel like quitting, think about why you started."
},
{
  name: "Super Girl",
  photo: "/images/4supergirl.jpg",
  week: 4,
  level: "Intermediate",
  motivation: "Making excuses burns zero calories per hour. Clear your mind of can't."
},
{
  name: "Lara Croft",
  photo: "/images/5laracroft.jpg",
  week: 5,
  level: "Advanced",
  motivation: "Fitness is like marriage. You can't cheat on it and expect it to work."
},
{
  name: "Mulan",
  photo: "/images/6mulan.jpg",
  week: 6,
  level: "Advanced",
  motivation: "Don't stop when it hurts. Stop when you're done."
},
{
  name: "Lost Girl",
  photo: "/images/7lostgirl.jpg",
  week: 7,
  level: "Master",
  motivation: "You will never know your limits unless you push yourself to them."
},
{
  name: "Black Widow",
  photo: "/images/8blackwidow.jpg",
  week: 8,
  level: "Master",
  motivation: "Do it. Because They said you couldn't. Make them jealous."
},
];


//
// db.Profile.remove({}, function(err, data) {
//   if (err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all info');
//
//     db.Profile.create(profile, function(err, data){
//       if (err) {
//         return console.log('err', err);
//       }
//       console.log('created profile');
//       process.exit();
//     });
//   }
// });
db.Gymworkout.remove({}, function(err, gym) {
  if (err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all gymworkouts');

    db.Gymworkout.create(gymworkouts_list, function(err, gym){
      if (err) {
        return console.log('err', err);
      }
      console.log('created', Object.keys(gymworkouts_list).length, 'gymworkouts');
      process.exit();
    });
  }
});
