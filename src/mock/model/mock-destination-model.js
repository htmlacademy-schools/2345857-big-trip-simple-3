import {getRandomDestination} from '../mock-destination';
import Observable from '../../framework/observable';
import Constants from '../../const';

export default class MockDestinationModel extends Observable {
  #destinations = [];

  init = async () => {
    for (let i = 0; i < 10; i++) {
      this.#destinations.push(getRandomDestination(i));
    }
    console.log(this.#destinations)
    this._notify(Constants.UpdateType.INIT);
  };

  get destinations() { return this.#destinations; }
}
