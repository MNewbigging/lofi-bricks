import { eventListener } from "./events/event-listener";

/**
 * All audio to be controlled by this class.
 * Appropriate audio lib needs installing first, then play in response to game events.
 */
export class AudioManager {
  constructor() {
    eventListener.on("beater-brick-collision", this.onBeaterBrickCollision);
    eventListener.on("beater-beater-collision", this.onBeaterBeaterCollision);
  }

  private onBeaterBrickCollision = () => {
    // Play SFX
  };

  private onBeaterBeaterCollision = () => {
    // Play SFX
  };
}
