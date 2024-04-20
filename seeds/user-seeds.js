const { User } = require('../models');


const userData = [
  {
    username: "salgood",
    email: "sal@hotmail.com"
  },
  {
    username: "lervio",
    email: "lernantino@gmail.com",
  },
  {
    username: "amikok",
    email: "amiko2k20@aol.com",
  }
];

const seedUsers = async () => {
  await User.deleteMany({});  // Clear existing users
  return User.create(userData);  // Create new users
}

module.exports = seedUsers;
