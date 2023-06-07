import * as Tone from "tone";

import { AudioLoader } from "./audio-loader";
import {
  BeaterBeaterCollision,
  BeaterBrickCollision,
} from "./events/event-map";
import { BeaterName } from "./types/beater-name";
import { BrickName } from "./types/brick-name";
import { eventListener } from "./events/event-listener";

/**
 * All audio to be controlled by this class.
 * Appropriate audio lib needs installing first, then play in response to game events.
 */
export class AudioManager {
  // Stores joinedName and id of scheduled callback for audio currently playing
  private playingMap = new Map<string, number>();

  constructor(private audioLoader: AudioLoader) {
    eventListener.on("game-start", this.onGameStart);
    eventListener.on("beater-brick-collision", this.onBeaterBrickCollision);
    eventListener.on("beater-beater-collision", this.onBeaterBeaterCollision);
  }

  private onGameStart = () => {
    // Set the starting tempo
    Tone.Transport.bpm.value = 85;

    // Start the scheduler
    Tone.Transport.start();
  };

  private onBeaterBrickCollision = (event: BeaterBrickCollision) => {
    // Each beater+brick name results in a single layer
    const joinedName = event.beaterName.concat(event.brickName);

    // If this is already playing
    const callbackId = this.playingMap.get(joinedName);
    if (callbackId !== undefined) {
      // If the id is -1, it is scheduled for removal
      if (callbackId < 0) {
        return;
      }

      // Change the id so we know not to enter this between now and when it's cleared
      this.playingMap.set(joinedName, -1);

      // Stop it from playing when the next measure starts
      Tone.Transport.scheduleOnce((time) => {
        Tone.Transport.clear(callbackId);
        // Remove from map
        this.playingMap.delete(joinedName);
        console.log("stopped", joinedName);
      }, "@1m");

      return;
    }

    const player = this.audioLoader.getPlayer(joinedName);
    if (!player) {
      console.log("could not find player for", joinedName);
      return;
    }

    // Play the sound
    const id = Tone.Transport.scheduleRepeat(
      (time) => {
        player.start(time);
        console.log("started", joinedName);
      },
      "8m",
      "@1m"
    );

    // Add to map
    this.playingMap.set(joinedName, id);
  };

  private onBeaterBeaterCollision = (event: BeaterBeaterCollision) => {
    // Play SFX
  };
}
