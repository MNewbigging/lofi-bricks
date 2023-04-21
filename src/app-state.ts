import Phaser from "phaser";

import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { eventListener } from "./events/event-listener";

export class AppState {
  private game?: Phaser.Game;
  private gameScene = new GameScene();

  constructor() {
    // Allow time for UI to mount
    setTimeout(() => this.setupGame(), 100);
  }

  startGame() {
    eventListener.fire("game-start", null);
  }

  private setupGame() {
    eventListener.on("game-loaded", this.onGameLoaded);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        parent: "game-mount",
        mode: Phaser.Scale.RESIZE,
      },
      transparent: true,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      fps: {
        min: 30,
        target: 60,
        smoothStep: true,
      },
      scene: [new BootScene(), this.gameScene],
    };

    this.game = new Phaser.Game(config);
  }

  private onGameLoaded = () => {
    this.startGame();
  };
}
