// require modules
const db = require(__dirname + '/models/db.js')
const questionId = 1
const testChangeOfQuestionTime = 5000 //5 seconds
const changeOfQuestionTime = 1000 * 60 * 60 * 24 //24 hours

function checkForUpdates(amountOfQuestions){
  setInterval(function(){
      updateQuestionForTheDay(amountOfQuestions)
  }, testChangeOfQuestionTime)
}

function updateQuestionForTheDay(amountOfQuestions){
  db.Timer.findOne()
  .then(timerValue => {
    var questionOfTheDay = timerValue.value===0 ? 1 : timerValue.value % amountOfQuestions + 1
    timerValue.update({
      value: questionOfTheDay
    })
  })
  .catch( e => {console.log(e)})
}

function startProgram(){
  setTimeout(function(){
    db.Timer.create({
      value: questionId
    })
    //get the amount of questions
    .then(function(){
      db.Question.findOne({
        order: [ [ 'id','DESC']]
      })
      .then( lastQuestion => {
        console.log('lastQuestion.id')
        console.log(lastQuestion.id)
        checkForUpdates(lastQuestion.id)
      })
    })
    .catch(e => console.log(e))

  }, 1500)
}

//Starting the program here
startProgram();
