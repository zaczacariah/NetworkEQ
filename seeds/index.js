const mongoose = require('mongoose');
const seedUser = require('./user-seeds');
const seedThoughts = require('./thoughts-seeds');





const seedAll = async () => {
  await mongoose.connect('mongodb://localhost:27017/networkeqDB');
  const users = await seedUser();

  users.forEach(user => {
    for( otherUser of users ){
      if(otherUser.username != user.username){
        user.friends.push(otherUser._id);
      }
    }
  })
  const thoughts = await seedThoughts(users);

  // Assuming users is an array of user documents returned from seeding
  for (let thought of thoughts) {
    // Find the user who created the thought
    const user = users.find(u => u.username === thought.username);
    if (user) {
      user.thoughts.push(thought._id);
      await user.save();
    }
  }
  console.log("Data Seeded!");
  process.exit(0);
};

seedAll();
