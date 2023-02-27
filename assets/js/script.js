const html = `<div class="container">
<!-- start box -->
<form action="#", id="start" class="box" >
  <h1 class="title">IQ TEST</h1>
  <img src="assets/images/images3.png" alt="">
  <h5>Welcome</h5>
  <input type="text" placeholder="Username" id="input">
  <button type="text" id="startBtn" class="button">Start</button>
</form>
<!-- test box -->
<div id="test" class="box hide" >
    <div id="header">
      <div id="number" class="button"><span>1 of 30</span></div>
      <div id="timer" class="button"><i class="fa-solid fa-stopwatch"></i><span>00:00</span></div>
    </div>
    <div id="main_test">
      <div id="question"><img src="assets/images/1/test1.png" alt=""></div>
      <div id="options">
        <img src="assets/images/1/1-1.png" alt="" class="answers">
        <img src="assets/images/1/1-2.png" alt="" class="answers">
        <img src="assets/images/1/1-3.png" alt="" class="answers">
        <img src="assets/images/1/1-4.png" alt="" class="answers">
        <img src="assets/images/1/1-5.png" alt="" class="answers">
        <img src="assets/images/1/1-6.png" alt="" class="answers">
        <img src="assets/images/1/1-6.png" alt="" class="answers">
      </div>
    </div>
</div>

<!-- result box -->
<div id="result"  class="box hide">
<h1 class="title">Result</h1>
<h5 id='top'>Dear, <span id="username">Mary</span> </h5>
<p id="score" class="button">Your IQ score is <span id="finalscore">95</span> </p>
<h5 id='description'> average</h5>
<p id="timeDetails">and you  have completed the test in 2 minutes</p>
<div id="chart"> 
<canvas id="myChart"></canvas>
</div>

</div>
</div>`;

const body = document.body;
body.innerHTML = html;

// selector
const form = document.querySelector("form");
const input = document.querySelector("#input");
const test = document.querySelector("#test");
const result = document.querySelector("#result");
const timer = document.querySelector("#timer >span");
const description = document.querySelector("#description");
const timeDetails = document.querySelector("#timeDetails");
const finalScore = document.querySelector("#finalscore");

const options = document.querySelector("#options");
const answers = document.getElementsByClassName("answers");
const number = document.querySelector("#number span");
const question = document.querySelector("#question");
const user = document.querySelector("#username");

let slideNum = 1;
// timer
let count = 0;
let secPart, minPart;
// correct answers array
const correctAnswers = [
  3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4, 7,
  7, 3, 2, 8,
];
let scorecount = 0;

// --------------------events
// form submit
form.addEventListener("submit", showPage);
function showPage(e) {
  e.preventDefault();
  if (input.value != "") {
    form.classList.add("hide");
    test.classList.remove("hide");
    let updatetime = setInterval(counter, 1000);
  }
}

// check if clicked answer is correct
options.addEventListener("click", check);
function check(e) {
  // click one option
  if (e.target.classList.contains("answers")) {
    clicked = e.target;

    if (slideNum < 30) {
      const index = correctAnswers[slideNum - 1] - 1;
      // if correct:
      if (clicked == answers[index]) {
        scorecount++;
      }

      updateTestBox(slideNum);
      slideNum++;
    } else {
      test.classList.add("hide");
      result.classList.remove("hide");
      updateResultBox(scorecount, timer.textContent);
    }
  }
}

// -------------------functions
// change test box
// Title: update test box
// neshan dadane soale baadi va update shomare soal
function updateTestBox(num) {
  num = Number(num);
  //change question number
  // slides number:num+1
  number.textContent = `${num + 1} of 30`;
  // change question
  question.firstChild.src = `assets/images/${num + 1}/test${num + 1}.png`;
  // optionNum=Number of options
  const optionNum = num + 1 <= 12 ? 6 : 8;
  let newTag = "";
  for (i = 1; i <= optionNum; i++) {
    newTag += ` <img src="assets/images/${num + 1}/${
      num + 1
    }-${i}.png" alt="" class="answers">`;
  }
  options.innerHTML = newTag;
}

// Title: set karane timer
// neshan dadane zamane separi shod be sorate 00:00
function counter() {
  count++;
  if (count < 60) {
    minPart = "00";
    secPart = count < 10 ? String(count).padStart(2, "0") : String(count);
  } else {
    minPart = String(Math.trunc(count / 60));

    secPart = String(count % 60);
    if (minPart < 10) {
      minPart = minPart.padStart(2, "0");
    }
    if (secPart < 10) {
      secPart = secPart.padStart(2, "0");
    }
  }
  timer.textContent = `${minPart}:${secPart}`;
}

// Title :update result Box
// neshan dadane natige test
// va zamane kole separi shide va chart
function updateResultBox(score, time) {
  //final iq score
  let text;
  const iqScore = Math.round(mapping(score));
  finalScore.textContent = iqScore;
  // IQ classification
  if (iqScore >= 130) {
    text = "Very Superior";
  } else if (iqScore >= 120 && iqScore <= 129) {
    text = "Superior";
  } else if (iqScore >= 110 && iqScore <= 119) {
    text = "High Average";
  } else if (iqScore >= 90 && iqScore <= 109) {
    text = "Average";
  } else if (iqScore >= 80 && iqScore <= 89) {
    text = "Low Average";
  } else if (iqScore >= 70 && iqScore <= 79) {
    text = "Very Low";
  } else if (iqScore <= 69) {
    text = "Extremely Low";
  }
  // display classification in Box
  const userName = input.value;
  user.textContent = userName;
  description.innerHTML = text;
  // display elapsed time
  const [minutes, seconds] = time.split(":");
  if (minutes == "00") {
    timeDetails.textContent = `you  have completed the test in ${
      seconds < 10 ? seconds[1] : seconds
    } second`;
  } else {
    timeDetails.textContent = ` you  have completed the test in ${
      time[0] == "0" ? time.slice(1) : time
    } minutes`;
  }
  displayChart(score);
}

//Title: mapping score
// change raw score to standard IQ score
function mapping(oldValue) {
  const oldMax = 28;
  const oldMin = 2;
  const newMax = 145;
  const newMin = 55;

  oldRange = oldMax - oldMin;
  newRange = newMax - newMin;
  return (newValue = ((oldValue - oldMin) * newRange) / oldRange + newMin);
}

// Title:create chart with chart.js
// namayeshe tedade pasokhhaye sahih va ghalat
//  besorate charte pie
function displayChart(value) {
  var xValues = ["correct", "wrong"];
  var yValues = [value, 30 - value];
  var barColors = ["#FDFF00", "white"];

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      // title: {
      //   display: true,
      // },
      legend: {
        labels: {
          fontSize: 18,
        },
      },
    },
  });
}
