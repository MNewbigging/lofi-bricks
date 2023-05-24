import * as Tone from "tone";

import { eventListener } from "./events/event-listener";

export class AudioLoader {
  loaded = false;
  playerMap = new Map<string, Tone.Player>();

  private audioFileMap = new Map<string, string>([
    ["drum-loop-1", "/audio/Drum_Loops/Drum_Loop_1_120bpm.wav"],
  ]);

  getPlayer(name: string) {
    return this.playerMap.get(name);
  }

  load() {
    this.audioFileMap.forEach((fileName, clipName) => {
      const url = new URL(fileName, import.meta.url).href;
      const player: Tone.Player = new Tone.Player(url, () =>
        this.onLoadPlayer(clipName, player)
      ).toDestination();
    });
  }

  private onLoadPlayer(clipName: string, player: Tone.Player) {
    // Add the player to the map
    this.playerMap.set(clipName, player);

    // Check if all players are now loaded
    if (this.playerMap.size === this.audioFileMap.size) {
      this.loaded = true;
      eventListener.fire("audio-loaded", null);
    }
  }
}
