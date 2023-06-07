import * as Tone from "tone";

import { BeaterName } from "./types/beater-name";
import { BrickName } from "./types/brick-name";
import { eventListener } from "./events/event-listener";

export class AudioLoader {
  loaded = false;
  playerMap = new Map<string, Tone.Player>();

  private audioFileMap = new Map<string, string>([
    [BeaterName.RED + BrickName.BLUE_DARK, "/audio/baseSnareLayer.wav"],
    [BeaterName.RED + BrickName.GREEN_DARK, "/audio/hihatLayer.wav"],
    [BeaterName.RED + BrickName.RED_DARK, "/audio/pianoLayer.wav"],
    [BeaterName.RED + BrickName.ORANGE_DARK, "/audio/rhodesLayer.wav"],
  ]);

  getPlayer(name: string) {
    return this.playerMap.get(name);
  }

  load() {
    this.audioFileMap.forEach((fileName, clipName) => {
      // Hack for published build
      let actualFileName = fileName;
      if (!window.location.href.includes("localhost")) {
        actualFileName = "/brick-beats" + actualFileName;
      }

      const url = new URL(actualFileName, import.meta.url).href;
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
