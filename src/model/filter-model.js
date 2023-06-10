import Observable from '../framework/observable';
import Constants from '../const';

export default class FilterModel extends Observable {
  #filter = Constants.FilterType.EVERYTHING;

  get filter() { return this.#filter; }

  setFilter(evt, filter) {
    this.#filter = filter;
    this._notify(evt, filter);
  }
}
