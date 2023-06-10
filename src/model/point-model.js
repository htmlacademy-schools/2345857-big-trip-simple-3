import Point from '../data/point';
import Observable from '../framework/observable';
import Constants from '../const';

export default class PointModel extends Observable {
  #points;
  #apiService;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#createPointObject);
    } catch (err) {
      this.#points = [];
    }
    this._notify(Constants.UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const idx = this.#points.findIndex((event) => event.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const point = this.#createPointObject(response);
      this.#points = [
        ...this.#points.slice(0, idx),
        point,
        ...this.#points.slice(idx + 1),
      ];
      this._notify(updateType, point);
    } catch (err) {
      throw new Error('Can\'t update tripPoint');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const point = this.#createPointObject(response);
      this.#points = [point, ...this.#points];
      this._notify(updateType, point);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const idx = this.#points.findIndex((point) => point.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t delete non-existing point');
    }

    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, idx),
        ...this.#points.slice(idx + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  };

  #createPointObject = (point) =>
    new Point(
      point['base_price'],
      point['date_from'],
      point['date_to'],
      point['destination'],
      point['id'],
      point['offers'],
      point['type']
    );

  get points() { return this.#points; }
}
