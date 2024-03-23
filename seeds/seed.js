const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
let posts = [];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed posts
  for (const post of postData) {
    let pst = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(pst);
  }

  // Seed comments
  console.log("----------------------------------------------------------------------------------------------------")
  console.log(users[Math.floor(Math.random() * users.length)].id,)
  console.log(posts[Math.floor(Math.random() * posts.length)].id,)
  console.log("----------------------------------------------------------------------------------------------------")
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();