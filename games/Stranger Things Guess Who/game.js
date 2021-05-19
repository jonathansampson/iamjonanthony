var gamedata = [
    [
        "Will", 
        "will.png",
        [
            "Who had a Jaws poster on their bedroom wall?",
            "Who owned a plush lion identical to Eleven's?",
            "Who had a wizard character in Dungeons and Dragons?"
        ]
    ],
    [
        "Dustin",
        "dustin.png",
        [
            "Who attended Camp Knowhere?",
            "Who had a crush on Suzie?",
            "Who built a home-made satellite?"
        ]
    ],
    [
        "Billy",
        "billy.jpg",
        [
            "Who worked as a lifeguard?",
            "Who had a younger sibling?",
            "Who had a mullet?",
            "Who was possessed by the Mindflayer?"
        ]
    ],
    [
        "Max",
        "max.jpg",
        [
            "Who is awesome at Dig Dug?",
            "Who is code-named 'Mad Max'?",
            "Who loves to skateboard?"
        ]
    ],
    [
        "Lucas",
        "lucas.jpg",
        [
            "Who loves fireworks?",
            "Who is very tall?",
            "Who is called 'Stalker'?",
            "Who dated one of their enemie's siblings?"
        ]
    ]
];

var answer = "";
var filename = "";
var wrongAnswers = 0;
var redX = document.getElementById("redx");
var title = document.getElementById("title");
var hints = [];
var whichHint = 0;
var hint = document.getElementById("hint");
var answerImage = document.getElementById("answer");
var guess = document.getElementById("guess");
var lastAnswer;

function start() {

    wrongAnswers = 0;
    hint.hidden = false;
    guess.hidden = false;
    guess.focus();

    do {
        // We need to randomnly select a character to proceed with
        var character = Math.floor(gamedata.length * Math.random());

    } while ( character === lastAnswer );

    lastAnswer = character;

    var characterData = gamedata[character];
    answerImage.classList.add("blurry");
    // Reset the game-state
    answer = characterData[0];
    filename = characterData[1];
    hints  = characterData[2];

    redX.textContent = "";
    answerImage.src = "images/" + filename;
    whichHint = 0;

    guess.value = "";
    document.body.classList.remove("bloody");
    title.textContent = "Stranger Things:Guess who?";

}

start();

hint.textContent = hints[whichHint];

setInterval(switchHint, 3000);

guess.addEventListener("keydown", checkAnswer);

answerImage.addEventListener("click", makeAnimate);

function makeAnimate() {
    answerImage.classList.toggle("animate");
}

function gameOver( ifWon ) {

    hint.hidden = true;
    guess.hidden = true;
    hints = [];

    if ( ifWon ) {
        console.log("You win!");
        setTimeout(start, 5000);
    } else {
        console.log("You lose!");
        eaten();
        setTimeout(start, 10000);
    }

    
}

function switchHint() {

    whichHint = whichHint + 1;

    if (whichHint === hints.length) {
        whichHint = 0;
    }

    hint.textContent = hints[whichHint];

}

function eaten() {

    if ( Math.random() < 0.5 ) {
        var monster = "Demogorgon";
        var monsterImage = "images/demogorgon.jpg";
    } else {
        var monster = "Mind-Flayer";
        var monsterImage = "images/mindflayer.jpg";
    }

    title.textContent = "You've been eaten by the " + monster + "!";
    document.body.classList.add("bloody");
    answerImage.src = monsterImage;
    answerImage.classList.remove("blurry");
    
    var growl = new Audio("growl.mp3");

    growl.addEventListener("ended", () => {
        new Audio("good-job.mp3").play();
        redX.textContent = "👁👄👁";
    });

    growl.play();

}

function checkAnswer(details) {

    if (details.code == "Enter") {

        var userAnswer = details.target.value;

        if (userAnswer.toLowerCase() === answer.toLowerCase()) {
            new Audio("good-job.mp3").play();
            answerImage.classList.remove("blurry");
            details.target.value = "";
            gameOver(true);
        } else {
            wrongAnswers = wrongAnswers + 1;
            if (wrongAnswers >= 3) {
                gameOver(false);
            }
            redX.append("❌");
            details.target.value = "";
            new Audio("buzzer.mp3").play();
        }

    } else {

        console.info("User is answering...");

    }

}