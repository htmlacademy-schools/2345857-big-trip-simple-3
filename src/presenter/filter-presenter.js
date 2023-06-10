import Constants from '../const';
import {getFilters} from '../utils/filters';
import TripEventsFilterView from '../view/trip-events-filter-view';
import {remove, render, replace} from '../framework/render';

export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #pointModel;
  #filterComponent;

  constructor(filterContainer, filterModel, pointModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [Constants.FilterType.EVERYTHING, Constants.FilterType.FUTURE].map((type) => ({
      type,
      count: getFilters()[type](this.#pointModel.points).length
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripEventsFilterView(
      this.filters,
      this.#filterModel.filter,
      this.#handleFilterTypeChange
    );

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(Constants.UpdateType.MAJOR, filterType);
  };
}
