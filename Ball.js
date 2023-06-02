const INITIAL_VELOCITY = 0.025;
const INCREASE_VELOCITY = 0.000001;

class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.start();
  }

  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }

  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  update(delta, barRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += INCREASE_VELOCITY * delta;

    const ballRect = this.getBoundary();
    // bounces ball back when it reaches the top or bottom of screen
    if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
      this.direction.y *= -1;
    }
    if (barRects.some((barRect) => bounceBack(barRect, ballRect))) {
      this.direction.x *= -1;
    }
  }

  start() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const route = randomDirection(0, 2 * Math.PI);
      this.direction = { x: Math.cos(route), y: Math.sin(route) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  getBoundary() {
    return this.ballElement.getBoundingClientRect();
  }
}

const randomDirection = (min, max) => {
  return Math.random() * (max - min) + min;
};

const bounceBack = (barRect, ballRect) => {
  return (
    barRect.right >= ballRect.left &&
    barRect.left <= ballRect.right &&
    barRect.top <= ballRect.bottom &&
    barRect.bottom >= ballRect.top
  );
};

export default Ball;
