window.addEventListener("load", run);

var container;

function run() {
  setContainer();
  setEvents();
  render();
}

function setContainer() {
  container = document.querySelector(".container");
}

function setEvents() {
  var redRange = document.querySelectorAll("input[type='range']");
  for (i = 0; i < redRange.length; i++) {
    redRange[i].addEventListener("input", render);
  }
}

function render(data) {
  var redRange = document.querySelector("#redRange");
  var redValue = document.querySelector("#redInput");
  redValue.value = redRange.value;

  var greenRange = document.querySelector("#greenRange");
  var greenValue = document.querySelector("#greenInput");
  greenValue.value = greenRange.value;

  var blueRange = document.querySelector("#blueRange");
  var blueValue = document.querySelector("#blueInput");
  blueValue.value = blueRange.value;

  container.style.backgroundColor = `rgb(${redValue.value}, ${greenValue.value}, ${blueValue.value})`;
}
