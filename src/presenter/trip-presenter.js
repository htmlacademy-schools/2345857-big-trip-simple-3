import { render } from '../framework/render.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';
import TripEmptyView from '../view/trip-empty-view.js';
import PointPresenter from './point-presenter';
import { sorts } from '../utils/sort.js';
import Constants from '../const';

export default class TripPresenter {
  #sorts = sorts;
  #tripListView = new TripEventsListView();
  #tripSortView = new TripEventsSortView(this.#sorts);
  #pointPresenters = new Map();
  #tripEventsComponent = null;
  #tripPoints = [];
  #tripPointsModel = null;
  #currentSortType = Constants.SortTypes.DAY;

  constructor(tripEventsComponent, tripPointsModel) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  get tripPoints() {
    return this.#tripPoints.sort(this.#sorts[this.#currentSortType]);
  }

  #renderPoint = (tripPoint) => {
    const pointPresenter = new PointPresenter(
      this.#tripListView.element,
      tripPoint,
      () => {
        this.#pointPresenters.forEach((it) => it.resetView());
      }
    );
    pointPresenter.init();
    this.#pointPresenters.set(tripPoint.id, pointPresenter);
  };

  #renderSortView = () => {
    render(this.#tripSortView, this.#tripEventsComponent);
    this.#tripSortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPointList = () => {
    render(this.#tripListView, this.#tripEventsComponent);
    for (let i = 0; i < this.tripPoints.length; i++) {
      this.#renderPoint(this.tripPoints[i]);
    }
  };

  #clearPointList = () => {
    this.#pointPresenters.forEach((it) => it.dispose());
    this.#pointPresenters.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#renderSortView();
    this.#clearPointList();
    this.#renderPointList();
  };

  init = () => {
    if (this.#tripPoints.length !== 0) {
      this.#renderSortView();
      this.#renderPointList();
    } else {
      render(new TripEmptyView(), this.#tripEventsComponent);
    }
  };
}
