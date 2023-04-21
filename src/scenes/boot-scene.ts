import Phaser from "phaser";

import { eventListener } from "../events/event-listener";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });

    eventListener.on("game-start", this.onGameStart);
  }

  preload() {
    // Load any assets for this scene here
  }

  create() {
    this.load.once("complete", this.onLoad);

    const ballsUrl = new URL("/balls.png", import.meta.url).href;
    const brickAtlasUrl = new URL("/brickAtlas.png", import.meta.url).href;
    const brickAtlasJsonUrl = new URL("/brickAtlas.json", import.meta.url).href;

    this.load.spritesheet("balls", ballsUrl, {
      frameWidth: 17,
      frameHeight: 17,
    });
    this.load.atlas("bricks", brickAtlasUrl, brickAtlasJsonUrl);

    this.load.start();
  }

  private readonly onLoad = () => {
    eventListener.fire("game-loaded", null);
  };

  private readonly onGameStart = () => {
    // Move to the game scene
    this.scene.start("GameScene");
  };
}
