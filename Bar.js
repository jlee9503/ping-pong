const BAR_SPEED = 0.009;

class Bar {
  constructor(barElement) {
    this.barElement = barElement;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.barElement).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.barElement.style.setProperty("--position", value);
  }

  update(delta, ballHeight) {
    this.position += BAR_SPEED * delta * (ballHeight - this.position);
  }

  reset() {
    this.position = 50;
  }

  getRect() {
    return this.barElement.getBoundingClientRect();
  }
}

export default Bar;