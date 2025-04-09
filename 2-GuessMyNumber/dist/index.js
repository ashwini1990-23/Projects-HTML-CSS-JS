let secretNumber = Math.trunc(Math.random() * 20 + 1);

let score = 20;
let highScore = 0;

const again = document.querySelector(".again");
again.addEventListener("click", () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    document.querySelector(".score").textContent = score;
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".number").textContent = '?';
    document.querySelector(".guess").value = '';
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector("number").style.width = '15rem';
})

const check = document.querySelector(".check");

check.addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value);

    //When there is no input from user
    if (!guess) {
        document.querySelector(".message").textContent = "No number!";
    }

    //When player wins
    else if (guess === secretNumber) {
        document.querySelector(".message").textContent = "Correct Number!!";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }

    //When guess is wrong
    else if (guess !== secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = guess > secretNumber ? "Too high!" : "Too low!";
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            document.querySelector('.message').textContent = "You lost the Game!";
            document.querySelector('.score').textContent = 0;
        }
    }
})