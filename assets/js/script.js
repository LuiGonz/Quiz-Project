//DECLARING VARIABLES
var timerElem = document.getElementById("timer");
var quizSection = document.getElementById("questions");
var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");
var submitBtn = document.getElementById("submit-btn");
var usersName = document.querySelector("#users-name");
var usersScore = document.querySelector("#previous-score");

//FUNCTION TO START TIMER
startBtn.addEventListener('click', function(event) {
  var timeLeft = 30;
  event.preventDefault;
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timerInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft >= 0) {
      // Set the `textContent` of `timerElem` to show the remaining seconds
      timerElem.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerElem.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerElem` to an empty string
      timerElem.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timerInterval);
      alert("Game Over!");
      displayResults();
    }
  }, 1000);
});

//FUNCTION TO START THE SLIDESHOW OF QUESTIONS
function startPage(){
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'none';
  startBtn.addEventListener('click', startSlide);

  function startSlide(event){
    event.preventDefault;
    startBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    showSlide(currentSlide);
  }
}

// reloads the page immediately
startPage();

//FUNCTION TO GENERATE QUESTIONS AND ANSWERS
function quizBuilder(){
  // create variable to store the output
  const output = [];

  // for each question
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizSection.innerHTML = output.join('');
}

//FUNCTION TO SHOW RESULTS PAGE
function displayResults(){

  // gather answer containers from our quiz
  const answerContainers = quizSection.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;
    }

  });

  // show number of correct answers out of total
  localStorage.setItem("score", numCorrect);
  console.log(numCorrect);
  var person = prompt("Please enter your name.");
  localStorage.setItem("user", person);
  if (person != null) {
    document.getElementById("user").innerHTML =
    `${person} scored ${numCorrect} out of ${myQuestions.length}`;
  }
}

function renderLastRegistered() {
  // Retrieve the last email and password and render it to the page
  var initials = localStorage.getItem("user");
  var score = localStorage.getItem("score");

  usersName.textContent = initials;
  usersScore.textContent = score;
}

//call the last registered user score on refresh
renderLastRegistered();

//FUNCTION TO SHOW SLIDES
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;

  if(currentSlide === slides.length-1){
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  }
  else{
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
}

//MAKE THE BUTTONS WORK WITH CLICKS OF NEXT AND SUBMIT
function showNextSlide() {
  showSlide(currentSlide + 1);
}

//QUIZ QUESTIONS
const myQuestions = [
  {
    question: "1. Most of the dinosaur fossils have been found on which continent?",
    answers: {
      A: "Africa",
      B: "North America",
      C: "South America"
    },
    correctAnswer: "B"
  },
  {
    question: "2. When did all dinosaurs become extinct?",
    answers: {
      A: "20 million years ago",
      B: "35 million years ago",
      C: "65 million years ago"
    },
    correctAnswer: "C"
  },
  {
    question: "3. Which of the following animals lived at the same period as dinosaurs?",
    answers: {
      A: "Mammoths",
      B: "Sabre-toothed cats",
      C: "Both above are wrong"
    },
    correctAnswer: "C"
  }
];

// display quiz right away
quizBuilder();

//Paging slide
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//Event Listeners
submitBtn.addEventListener('click', displayResults);
nextBtn.addEventListener("click", showNextSlide);

function reloadThePage(){
    window.location.reload();
}