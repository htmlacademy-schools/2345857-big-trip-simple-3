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

  updateTripPoint = async (updateType, update) => {
    const index = this.#points.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting tripPoint');
    }

    try {
      const response = await this.#apiService.updateTripEvent(update);
      const updatedTripEvents = this.#createPointObject(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedTripEvents,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedTripEvents);
    } catch (err) {
      throw new Error('Can\'t update tripPoint');
    }
  };

  addTripPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addTripEvent(update);
      const newTripPoint = this.#createPointObject(response);
      this.#points = [newTripPoint, ...this.#points];
      this._notify(updateType, newTripPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  };

  deleteTripPoint = async (updateType, update) => {
    const index = this.#points.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete not existing point');
    }

    try {
      await this.#apiService.deleteTripEvent(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
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
