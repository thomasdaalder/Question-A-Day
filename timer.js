// require modules
const db = require(__dirname + '/models/db.js')

//constant variables for setting date
// let currentTime = new Date()
// let currentDay = currentTime.getDate()
// let currentMonth = currentTime.getMonth()
// let dayAndMonth = `${currentDay}-${currentMonth}`
let questionId = 1

let date = new Date()
let minute = date.getMinutes()

// function checkForUpdates(amountOfQuestions){
//   n = 0
//   var date1 = Date.now()
//   while(n <= 9876543219){
//       n = n + 1
//       if(i === 98765432 || i === 9876543219){
//           console.log('hey')
//       }
//   }
//   var date2 = Date.now()
//   console.log(date2-date1)
// }
// //
//
//
// function checkForUpdates(amountOfQuestions){
//   while( true ) {
//     let currentDayNow = currentTime.getDate()
//     let currentMonthNow = currentTime.getMonth()
//     let dayAndMonthNow = `${currentDay}-${currentMonth}`
//     // let dayAndMonthNow = 1
//     if (dayAndMonth === dayAndMonthNow) {
//       console.log('doe niks')
//     }
//     else{
//       console.log('Im supposed to run once')
//       dayAndMonth = dayAndMonthNow
//       db.Timer.findOne()
//       .then( timer => {
//         //bij 6 vragen als total amount of questions
//         // ((6-1) % 6)+1 is question.id 6
//         // ((7-1) % 6)+1 is question.id 1
//         questionId = ((questionId - 1) % amountOfQuestions)+1
//         db.Timer.update({
//           value: questionId
//         })
//       })
//     }
//   }
// }

function checkForUpdates(amountOfQuestions){
  setInterval(function(){
    let currentDate = new Date()
    let currentMinute = currentDate.getMinutes()
    // if (minute === currentMinute) {
    //   //console.log('doe niks')
    // }
    // else{
      console.log('Im supposed to run once')
      minute = currentMinute
      //rewrite of: db.Timer.findOne().then(x => console.log(x))
      updateQuestionForTheDay(amountOfQuestions)

      // test(amountOfQuestions);
    // }
  }, 5000)

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

function test(amountOfQuestions){
  setTimeout(function(){
      updateQuestionForTheDay(amountOfQuestions)
      setTimeout(function(){
          updateQuestionForTheDay(amountOfQuestions)
          setTimeout(function(){
              updateQuestionForTheDay(amountOfQuestions)
              setTimeout(function(){
                  updateQuestionForTheDay(amountOfQuestions)
                  setTimeout(function(){
                      updateQuestionForTheDay(amountOfQuestions)
                      setTimeout(function(){
                          updateQuestionForTheDay(amountOfQuestions)
                          setTimeout(function(){
                              updateQuestionForTheDay(amountOfQuestions)
                              setTimeout(function(){
                                  updateQuestionForTheDay(amountOfQuestions)
                                  setTimeout(function(){
                                      updateQuestionForTheDay(amountOfQuestions)
                                      setTimeout(function(){
                                          updateQuestionForTheDay(amountOfQuestions)
                                          setTimeout(function(){
                                              updateQuestionForTheDay(amountOfQuestions)
                                              setTimeout(function(){
                                                  updateQuestionForTheDay(amountOfQuestions)
                                                  setTimeout(function(){
                                                      updateQuestionForTheDay(amountOfQuestions)
                                                  }, 1000)
                                              }, 1000)
                                          }, 1000)
                                      }, 1000)
                                  }, 1000)
                              }, 1000)
                          }, 1000)
                      }, 1000)
                  }, 1000)
              }, 1000)
          }, 1000)
      }, 1000)
  }, 1000)
}
