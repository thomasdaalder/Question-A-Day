// Enabling connection w/ Sequelize
const Sequelize = require('sequelize');
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/nodeblog';
const db = new Sequelize(connectionString);

// Defining users model
const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})

// Defining posts model
const Post = db.define('post', {
  title: Sequelize.STRING,
  body: Sequelize.STRING(1000),
  date: Sequelize.DATE
})

// Defining comments model
const Comment = db.define('comment', {
  username: Sequelize.STRING,
  body: Sequelize.STRING
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
      password: "hackme"
    })
  })
.then(function(user){
      return user.createPost({
      title: "How to Spot a Common Mental Error That Leads to Misguided Thinking",
      body: "Human beings have been blaming strange behavior on the full moon for centuries. In the Middle Ages, for example, people claimed that a full moon could turn humans into werewolves.",
      date: "2017-02-25"
    })
  })
.then(function(post) {
      return post.createComment({
        username: "Metta",
        body: "Wow, thank you for writing this. This changed my life."
      })
})
.catch( (error) => console.log(error) );

module.exports = {
  db: db,
  User: User,
  Post: Post,
  Comment: Comment
}
