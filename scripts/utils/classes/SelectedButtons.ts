import { Buttons } from "./interfaces/interfaces";
import { Vector3 } from "@minecraft/server";

export class SelectedButtons implements Buttons {
  location: Vector3;
  /**
   * Constructs a new SelectedButtons instance.
   *
   * @param {Vector3} location - The location of the button.
   */
  constructor(location: Vector3) {
    /**
     * The location of the button.
     * @type {Vector3}
     */
    this.location = location;
  }

  /**
   * Returns the location of the button.
   *
   * @returns {Vector3} The location of the button.
   */
  getLocation(): Vector3 {
    return this.location;
  }

  /**
   * Sets the location of the button.
   *
   * @param {Vector3} location - The new location of the button.
   */
  setLocation(location: Vector3): void {
    this.location = location;
  }
}
