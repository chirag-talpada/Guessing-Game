const inputNumber = document.getElementById("txtnum");
const msg = document.querySelector(".msg");
const body = document.querySelector("body");
const titleNum = document.getElementById("numberTitle");
const scoreLabel = document.getElementById("playerScore");
const highScore = document.getElementById("highscore");
let upperRange = 20;

let timer;
let score = 20;

if (localStorage.getItem("highScore" + upperRange)) {
  highScore.innerText =
    "🏆 Highscore : " + localStorage.getItem("highScore" + upperRange);
}

document.querySelector(".check").addEventListener("click", function () {
  let val = inputNumber.value;

  clearTimeout(timer);
  clearOut();

  if (!val >= 1 && val <= upperRange) {
    msg.innerText = "🙄 Opps, Invalid Number";
    msg.classList.add("addBlink");
    return;
  }

  let randomNum = Math.trunc(Math.random() * upperRange) + 1;
  titleNum.innerText = randomNum;

  if (val > randomNum) {
    msg.innerText = "👇 Sorry it's little bit low";
    msg.classList.add("addBlink");
    score--;
  } else if (val < randomNum) {
    msg.innerText = "☝ Sorry it's little bit high";
    msg.classList.add("addBlink");
    score--;
  } else {
    msg.innerText = "🤩😎😍 Perfect shot 🎉!!! ";
    score++;
    body.classList.add("won");

    if (localStorage.getItem("highScore" + upperRange)) {
      if (score > Number(localStorage.getItem("highScore" + upperRange))) {
        localStorage.setItem("highScore" + upperRange, score);
        highScore.innerText =
          "🏆 Highscore : " + localStorage.getItem("highScore" + upperRange);
      }
    } else {
      localStorage.setItem("highScore" + upperRange, score);
      highScore.innerText =
        "🏆 Highscore : " + localStorage.getItem("highScore" + upperRange);
    }
  }

  if (score <= 0) {
    msg.innerText = "😭 You Lost !!!😭";
    msg.classList.remove("addBlink");
    body.classList.add("lost");
    score = 20;
    scoreLabel.innerText = "🤠 Score : " + score;
    titleNum.innerText = "?";
    inputNumber.value = null;
  }

  timer = setTimeout(function () {
    clearOut();
    msg.innerText = "Start guessing...";
  }, 7000);
  scoreLabel.innerText = "🤠 Score : " + score;
});

function restart() {
  score = 20;
  msg.innerText = "Start guessing...";
  scoreLabel.innerText = "🤠 Score : " + score;
  titleNum.innerText = "?";
  clearOut();
  inputNumber.value = null;
  clearTimeout(timer);
}

function clearOut() {
  body.classList.remove("won");
  body.classList.remove("lost");
  msg.classList.remove("addBlink");
}

function changeRange() {
  let upperBoound = prompt("Enter UpperBound value: (between 1 and ? )");

  if (isNaN(upperBoound)) {
    alert("enter valid Number");
    return;
  }
  upperRange = Number(upperBoound);
  if (localStorage.getItem("highScore" + upperRange)) {
    highScore.innerText =
      "🏆 Highscore : " + localStorage.getItem("highScore" + upperRange);
  } else {
    highScore.innerText = "🏆 Highscore : 0";
  }

  document.getElementById(
    "rangelabel"
  ).innerText = `<between 1 and ${upperRange}>`;

  inputNumber.max = upperRange;
}
