

// Quiz question object
var quizQuestions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: [ "js", "javascript", "script", "scripting"], 
    answer: "script"
},
  {
    title: "Where is the correct place to insert a JavaScript?",
    choices: ["body or head", "body", "head", "none of the above"],
    answer: "body or head"
},
   {
    title: "What is used primarily to add styling to a web page?",
    choices: ["HTML", "CSS", "Python", "React.js"],
    answer: "CSS"},
    {
    title: "How do you write Hello World in an alert box?",
    choices:["msg(hello world)", "alert(hello world)", "msgbox(hello world)", "alertbox(hello world)" ],
    answer: "alertbox(hello world)"},
    {
    title: "When is localStorage data cleared?",
    choices: ["no expiration time", "on page reload", "on browser close", "on computer restart"],
    answer: "No expiration time"},  
    {
    title: "What does WWW stand for?",
    choices: ["web world workings", "weak winter wind", "world wide web", "wendy wants waffles"],
    answer: "world wide web"},
     
    ];

    //Declare variables
    var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");


var timeLeft = 76;

var Interval = 0;

var penalty = 10;

var ulCreate = document.createElement("ul");

// start timer
timer.addEventListener("click", function () {
    
    if (Interval === 0) {
        Interval = setInterval(function () {
            timeLeft--;
            currentTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(Interval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops
    for (var i = 0; i < quizQuestions.length; i++) {
        
        var userQuestion = quizQuestions[questionIndex].title;
        var userChoices = quizQuestions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
        console.log(userQuestion)
    }
   
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == quizQuestions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + quizQuestions[questionIndex].answer;
            
        } else {
            // Will deduct 5 seconds if wrong
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + quizQuestions[questionIndex].answer;
        }

    }
    // Question Index determines the question they're on
    questionIndex++;

    if (questionIndex >= quizQuestions.length) {
        
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + quizQuestions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(Interval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.replace("./Highscores.html");
        }
    });

}