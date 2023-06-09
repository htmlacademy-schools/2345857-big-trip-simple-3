import Destination from '../data/destination';

export default class DestinationModel {
  #destinations;
  #apiService;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const destinations = await this.#apiService.destinations;
      this.#destinations = destinations.map(this.#createDestinationObject);
    } catch (err) {
      this.#destinations = [];
    }
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
