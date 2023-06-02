import Ball from "./Ball.js";
import Bar from "./Bar.js";

const ball = new Ball(document.getElementById("ball"));
const player = new Bar(document.getElementById("player-bar"));
const computer = new Bar(document.getElementById("computer-bar"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let prevTime;

const update = (time) => {
  if (prevTime != null) {
    const delta = time - prevTime;

    ball.update(delta, [player.getRect(), computer.getRect()]);
    computer.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
    
    if (gameOver()) {
      updateScore();
    }
  }

  prevTime = time;
  window.requestAnimationFrame(update);
};

const gameOver = () => {
  const boundary = ball.getBoundary();
  return boundary.right >= window.innerWidth || boundary.left <= 0;
};

const updateScore = () => {
  const boundary = ball.getBoundary();

  // player scores
  if (boundary.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else {
    // computer scores
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }

  ball.start();
  computer.reset();
};

document.addEventListener("mousemove", (e) => {
  player.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
