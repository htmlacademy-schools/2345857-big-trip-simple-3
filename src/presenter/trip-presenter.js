import { render } from '../framework/render.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';
import TripEmptyView from '../view/trip-empty-view.js';
import {getMockSorts} from '../mock/mock-sort';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #tripListView = new TripEventsListView();
  #tripEventsComponent = null;
  #tripPoints = null;
  #tripPointsModel = null;
  #sorts = getMockSorts();
  #pointPresenters = new Map();

  constructor(tripEventsComponent, tripPointsModel) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  #renderTripPoint = (tripPoint) => {
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

  init = () => {
    if (this.#tripPoints.length !== 0) {
      render(new TripEventsSortView(this.#sorts), this.#tripEventsComponent);
      render(this.#tripListView, this.#tripEventsComponent);
      for (let i = 0; i < 3; i++) {
        this.#renderTripPoint(this.#tripPoints[i]);
      }
    } else {
      render(new TripEmptyView(), this.#tripEventsComponent);
    }
  };
}
