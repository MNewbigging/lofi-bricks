import Phaser from "phaser";
import { action, makeAutoObservable, observable } from "mobx";

import { AudioManager } from "./audio-manager";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { eventListener } from "./events/event-listener";

export class AppState {
  @observable loading = true;
  @observable gameStarted = false;

  private game?: Phaser.Game;
  private gameScene = new GameScene();
  private audioManager = new AudioManager();

  constructor() {
    makeAutoObservable(this);

    // Allow time for UI to mount
    setTimeout(() => this.setupGame(), 100);
  }

  @action startGame = () => {
    this.gameStarted = true;
    eventListener.fire("game-start", null);
  };

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

  @action private onGameLoaded = () => {
    this.loading = false;
    console.log("loaded");
  };
}
