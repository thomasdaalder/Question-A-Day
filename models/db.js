// Enabling connection w/ Sequelize
const Sequelize = require('sequelize');
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/question';
const db = new Sequelize(connectionString);

// Defining users model
const User = db.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
})

// Defining posts model
const Post = db.define('post', {
  title: Sequelize.STRING,
  body: Sequelize.STRING(1000)
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

// Syncing database and creating base user
db.sync({
	force: true,
})
.then(function(){
    return User.create({
      username: "kevin",
      password: "12345678"
    })
  })
.then(function(user){
      return user.createPost({
        title: "How to Spot a Common Mental Error That Leads to Misguided Thinking",
        body: "Human beings have been blaming strange behavior on the full moon for centuries. In the Middle Ages, for example, people claimed that a full moon could turn humans into werewolves."
    })
  })
.then(function(post) {
      return post.createComment({
        username: "Metta",
        body: "Wow, thank you for writing this. This changed my life."
      })
})
.then(function(){
      return Question.bulkCreate([{
        question: "What have you learned today?"
      },
      {
        question: "What would you do different tomorrow?"
      },
      {
        question: "Who made you laugh today?"
      },
      {
        question: "What annoyed you today?"
      },
      {
        question: "What is the most important thing in your life?"
      },
      {
        question: "You couldn't live without...?"
      },])
})

.catch( (error) => console.log(error) );

module.exports = {
  db: db,
  User: User,
  Post: Post,
  Comment: Comment,
  Question: Question,
  Timer: Timer,
}
