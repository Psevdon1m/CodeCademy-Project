let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let startButton = document.getElementById("start");
let currentlyPlaying = true;

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let score = 0;
let best = 0;
let scoreCount = document.getElementById("c-score");
let bestCount = document.getElementById("b-score");

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
};

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const isClicked = (door) => {
  if (door.src == closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

doorImage1.onclick = function () {
  if (isClicked(doorImage1) !== true && currentlyPlaying === true) {
    numClosedDoors = numClosedDoors - 1;
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  } else {
    numClosedDoors = numClosedDoors;
  }
};

doorImage2.onclick = function () {
  if (isClicked(doorImage2) !== true && currentlyPlaying === true) {
    numClosedDoors = numClosedDoors - 1;
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  } else {
    numClosedDoors = numClosedDoors;
  }
};

doorImage3.onclick = function () {
  if (isClicked(doorImage3) !== true && currentlyPlaying === true) {
    numClosedDoors = numClosedDoors - 1;
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  } else {
    numClosedDoors = numClosedDoors;
  }
};

const playDoor = (door) => {
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver("lose");
    score = 0;
  }
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    score++;
    scoreCount.innerHTML = score;
    if (score > best) {
      best = score;
      bestCount.innerHTML = best;
    } else {
      bestCount.innerHTML = best;
    }
  } else {
    startButton.innerHTML = "Game over! Play again?";
    score = 0;
    scoreCount.innerHTML = score;
  }
  currentlyPlaying = false;
};

startRound();
