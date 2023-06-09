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
  #tripEventsComponent;

  #pointModel;
  #destinationModel;
  #offersModel;

  #currentSortType = Constants.SortTypes.DAY;

  constructor(tripEventsComponent, pointModel, destinationModel, offersModel) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#pointModel.points.sort(this.#sorts[this.#currentSortType]);
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #renderPoint = (tripPoint) => {
    const pointPresenter = new PointPresenter(
      this.#tripListView.element,
      tripPoint,
      () => {
        this.#pointPresenters.forEach((it) => it.resetView());
      },
      this.destinations,
      this.offers,
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
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
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
    if (this.points.length !== 0) {
      console.log(this.points);
      this.#renderSortView();
      this.#renderPointList();
    } else {
      render(new TripEmptyView(), this.#tripEventsComponent);
    }
  };
}
