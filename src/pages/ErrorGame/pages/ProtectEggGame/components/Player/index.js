import { centerX, centerY } from "../../constant";

import Circle from "../Circle";

export default class Player extends Circle {

  /** @private @type {Set<string>} */
  _keyDown;

  constructor (context, x, y, r, vx, vy) {
    super(context, x, y, r, vx, vy);
    this.vr = 4;
    this.angle = -90 * Math.PI / 180;
    this.pointRadius = 64;
    this.dir = 1;

    this.sprite = null;
    this.rotation = 0;

    this.initiate = true;

    this._keyDown = new Set();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.handleKeyDown);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    document.addEventListener('keyup', this.handleKeyUp);

    this.x = centerX + Math.cos(this.angle) * this.pointRadius;
    this.y = centerY + Math.sin(this.angle) * this.pointRadius;
  }

  /**
   * @private
   * @param {KeyboardEvent} event 
   */
  handleKeyDown (event) {
    this._keyDown.add(event.key.toLowerCase());
  }

  /**
   * @private
   * @param {KeyboardEvent} event 
   */
  handleKeyUp (event) {
    this._keyDown.delete(event.key.toLowerCase());
  }

  setSprite (value) {
    this.sprite = value;
    this.texture = this.sprite.src;
    return this;
  }

  update (deltaTime) {
    if (this.initiate) {}

    if (this._keyDown.has('arrowright')) {
      this.dir = 1;
    } else if (this._keyDown.has('arrowleft')) {
      this.dir = -1;
    }

    const isPressed = this._keyDown.has('arrowleft') || this._keyDown.has('arrowright');
    if (isPressed) {
      this.x = centerX + Math.cos(this.angle) * this.pointRadius;
      this.y = centerY + Math.sin(this.angle) * this.pointRadius;
      this.angle += this.vr * this.dir * deltaTime;
    }

    if (this.visible && this.texture) {
      const dx = this.x - centerX;
      const dy = this.y - centerY;
      const baseRotation = 90 * Math.PI / 180;
      this.rotation = Math.atan2(dy, dx) + baseRotation;
    }
  }

  render () {
    if (this.visible) {
      if (this.texture) {
        this.rotateAndPaintImage(
          this.sprite,
          this.rotation,
          this.x,
          this.y,
          this.sprite.width / 2,
          this.sprite.height / 2
        );
      }

      // this.ctx.strokeStyle = this.color;
      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // this.ctx.stroke();
    }
  }

}