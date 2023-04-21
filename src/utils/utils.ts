import { brickNames } from "../types/brick-name";

export function randomRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

export function getRandomBrickName() {
  const rnd = Math.floor(Math.random() * brickNames.length);
  return brickNames[rnd];
}
