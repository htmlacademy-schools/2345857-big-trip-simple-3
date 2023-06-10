import {getRandomDestination} from '../mock-destination';

export default class MockDestinationModel {
  #destinations = [];

  init() {
    for (let i = 0; i < 10; i++) {
      this.#destinations.push(getRandomDestination(i));
    }
  }

  get destinations() { return this.#destinations; }
}
