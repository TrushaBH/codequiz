var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local storage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createtoken = document.createElement("token");
        createtoken.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createtoken);

    }
}
//  moving to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});