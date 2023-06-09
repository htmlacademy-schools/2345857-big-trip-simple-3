import { generateMockPoint } from '../mock-point';

const POINTS = 10;

export default class MockPointModel {
  #points;

  init() {
    this.#points = Array.from({length: POINTS}, generateMockPoint);
  }

  get points() { return this.#points; }
}
