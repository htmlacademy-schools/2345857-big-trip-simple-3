import Point from '../data/point';

export default class PointModel {
  #points;
  #apiService;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#createPointObject);
    } catch (err) {
      this.#points = [];
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
