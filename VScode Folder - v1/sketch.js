let oceanWaveSound;
let meditationSound;
let hasStarted = false;


function preload() {
  oceanWaveSound = loadSound('ocean-wave-2.mp3');
  meditationSound = loadSound('Tara-Brach-From-Head-to-Heart-5-Min-Meditation-_2_.mp3');
}

let slider;
let waveOffset = 0; // Add variable for wave animation
let startTime; // Variable to record the start time

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
// HTML button object:
let portButton;
let inData; // for incoming serial data

function setup() {
  let canvas = createCanvas(410, 720);
  canvas.parent('canvas-holder');
  startTime = millis(); // Record the start time

  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);

  slider = createSlider(-30, 30, 0); // Create a slider ranging from -30 to 30, starting at 0
 //  slider.hide(); // Hide the slider from the user interface
}

function drawWomanAt10() {
  // Body
  line(0, -100, 0, -70);

  // Head (solid black)
  fill(255); // Black color
  ellipse(0, -100, 20, 20);

  noFill(); // Reset fill for other elements

  // Arms (moved further down the body)
  line(0, -85, -20, -90);
  line(0, -85, 20, -90);

  // Legs
  line(0, -70, -5, -50);
  line(0, -70, 5, -50);
}

function draw() {
  if (hasStarted) {

  let currentTime = millis(); // Get the current time

  if (currentTime < 1000 && !oceanWaveSound.isPlaying()) { // Play at the start
    oceanWaveSound.play();
  }

  if (currentTime > 35000 && !meditationSound.isPlaying()) { // Play at 65 seconds
    meditationSound.play();
  }



  background(0);

  let timeElapsed = currentTime - startTime; // Calculate how much time has passed since the start


  // Check if it's been more than 60 seconds since the start
  if (timeElapsed > 30000) {
    let fadeFactor = constrain((timeElapsed - 30000) / 5000, 0, 1); // 5000 milliseconds for the fade duration
    let waveColor = lerpColor(color(255), color(0), fadeFactor); // Interpolate between white and black based on the fade factor
    stroke(waveColor);
  } else {
    stroke(255);
  }
  noFill();

  let startY = waveOffset; // Use waveOffset to animate the waves
  for (let i = 0; i < 36; i++) {
    
      let weight = map(i, 0, 36, 1, 10); // Map the index of the wave to a stroke weight
  strokeWeight(weight); // Set the stroke weight based on the wave's index

    
    beginShape();
    curveVertex(0, startY + 60); // Remove slider value from the wave effect
    curveVertex(0, startY + 60);
    curveVertex(190, startY + 40);
    curveVertex(250, startY);
    curveVertex(320, startY + 30);
    curveVertex(400, startY);
    curveVertex(400, startY);
    endShape();
    startY += 20;
  }
  
  strokeWeight(1); // Reset the stroke weight for other drawing

  
    waveOffset = (waveOffset + 1) % 20; // Update waveOffset for continuous animation


  push();

  let yShift = slider.value() * 17;

  // Create a boundary for yShift, allowing it to go up to a higher value, e.g., 300
  if (yShift > 300) { // Updated upper boundary
    yShift = 300;
  } else if (yShift < -160) {
    yShift = -160;
  }

  console.log("Y-Shift (vertical position):", yShift);

  translate(210, 620 - yShift);

  let rotationAngle = -20 + slider.value(); // Base rotation angle

  // Constrain the rotation angle so it doesn't go below -32
  rotationAngle = constrain(rotationAngle, -32, rotationAngle);

  // If yShift is 450, adjust the rotation angle for surfing down the wave
  if (yShift === 450) {
    rotationAngle += (slider.value() > 0 ? slider.value() : 0);
  }

  console.log("Rotation Angle:", rotationAngle); // Log the rotation angle

  rotate(radians(rotationAngle)); // Apply the rotation angle

   // Draw surfboard
  fill(255);
  noStroke(); // Remove the border around the surfboard
  ellipse(0, 0, 37, 180); // Revert to ellipse shape

  // Draw the line in the middle of the surfboard
  stroke(0);
  line(0, -80, 0, 90);

  translate(0,80);
  drawWomanAt10(); // Call the function to draw the woman at 0:10

  pop();
}
}


// PORTED OVER CODE FOR ARDUINO



/////////////////////////////
// SEND AND RECEIVE DATA  ///
/////////////////////////////

function serialEvent() {
  let inString = serial.readStringUntil("\r\n");
  if (inString) {


    console.log(inString);
    inData = inString;
    let inNum = Number(inData);


    // Map the value from the rotary encoder to the desired range
    let mappedValue = map(inNum, 127, -128, -160, 450);
    console.log("Mapped Value:", mappedValue);  // <-- Add this line

    
    // Constrain the value to the desired range
    let constrainedValue = constrain(mappedValue, -160, 450);

    // Update the slider value with the constrained and mapped value
    slider.value(constrainedValue);



    serial.write("x");
  }
}

/////////////////////////////////////////////
// UTILITY FUNCTIONS TO MAKE CONNECTIONS  ///
/////////////////////////////////////////////

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
    serial.write("x");
    
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

document.getElementById('startWithSound').addEventListener('click', function() {
  hasStarted = true;
  oceanWaveSound.play();
});

document.getElementById('startWithoutSound').addEventListener('click', function() {
  hasStarted = true;
});