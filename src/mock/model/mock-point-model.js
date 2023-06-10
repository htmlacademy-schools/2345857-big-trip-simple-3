import { generateMockPoint } from '../mock-point';
import Observable from '../../framework/observable';
import Constants from '../../const';

const POINTS = 10;

export default class MockPointModel extends Observable {
  #points;

  init = async () => {
    this.#points = Array.from({length: POINTS}, generateMockPoint);
    this._notify(Constants.UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const idx = this.#points.findIndex((point) => point.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    this.#points = [
      ...this.#points.slice(0, idx),
      update,
      ...this.#points.slice(idx + 1),
    ];
  };

  addPoint = async (updateType, update) => this.#points.push(update);

  deletePoint = async (updateType, update) => {
    const idx = this.#points.findIndex((point) => point.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t delete non-existing point');
    }

    this.#points = [
      ...this.#points.slice(0, idx),
      ...this.#points.slice(idx + 1),
    ];
  };

  get points() { return this.#points; }
}
