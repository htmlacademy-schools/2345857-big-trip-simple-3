import Destination from '../data/destination';
import Observable from '../framework/observable';
import Constants from '../const';

export default class DestinationModel extends Observable {
  #destinations;
  #apiService;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const destinations = await this.#apiService.destinations;
      this.#destinations = destinations.map(this.#createDestinationObject);
    } catch (err) {
      this.#destinations = [];
    }
    this._notify(Constants.UpdateType.INIT);
  };

  #createDestinationObject = (destination) =>
    new Destination(
      destination['id'],
      destination['description'],
      destination['name'],
      destination['pictures']
    );

  get destinations() { return this.#destinations; }
}
