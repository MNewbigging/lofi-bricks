import * as Tone from "tone";

import { AudioLoader } from "./audio-loader";
import {
  BeaterBeaterCollision,
  BeaterBrickCollision,
} from "./events/event-map";
import { eventListener } from "./events/event-listener";

/**
 * All audio to be controlled by this class.
 * Appropriate audio lib needs installing first, then play in response to game events.
 */
export class AudioManager {
  constructor(private audioLoader: AudioLoader) {
    eventListener.on("game-start", this.onGameStart);
    eventListener.on("beater-brick-collision", this.onBeaterBrickCollision);
    eventListener.on("beater-beater-collision", this.onBeaterBeaterCollision);
  }

  private onGameStart = () => {
    // Set the starting tempo
    Tone.Transport.bpm.value = 120;

    // Start the scheduler
    Tone.Transport.start();

    // Play a sound
    const player = this.audioLoader.getPlayer("drum-loop-1");
    player?.start();
  };

  private onBeaterBrickCollision = (event: BeaterBrickCollision) => {
    console.log("beater-brick", event);
  };

  private onBeaterBeaterCollision = (event: BeaterBeaterCollision) => {
    // Play SFX
  };
}
