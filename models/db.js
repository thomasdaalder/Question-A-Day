// Enabling connection w/ Sequelize
const Sequelize = require('sequelize');
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/question';
const db = new Sequelize(connectionString);

// Defining users model
const User = db.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  email: Sequelize.STRING
})

// Defining posts model
const Post = db.define('post', {
  title: Sequelize.STRING,
  body: Sequelize.STRING(1000),
  point: Sequelize.INTEGER
})

// Defining comments model
const Comment = db.define('comment', {
  username: Sequelize.STRING,
  body: Sequelize.STRING
})

// Defining questions
const Question = db.define('question', {
  question: Sequelize.STRING
})

//define table timer.
const Timer = db.define('timer',{
  value: Sequelize.INTEGER
})

// Creating relationships
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = {
  db: db,
  User: User,
  Post: Post,
  Comment: Comment,
  Question: Question,
  Timer: Timer,
}
