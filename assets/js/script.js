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
