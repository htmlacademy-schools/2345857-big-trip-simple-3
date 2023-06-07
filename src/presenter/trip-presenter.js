import { render } from '../render.js';

import TripEventsFormView from '../view/trip-events-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';

export default class TripPresenter {
  tripListView = new TripEventsListView();
  #container = null;
  #tripPoints = null;
  #tripPointsModel = null;

  constructor(tripPointsModel) {
    this.#tripPointsModel = tripPointsModel;
  }

  init = (container) => {
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
    this.#container = container;

    render(new TripEventsSortView(), this.#container);

    this.tripListView.addComponent(new TripEventsFormView(this.#tripPoints[0]));

    for (let i = 0; i < 3; i++) {
      this.tripListView.addComponent(new TripEventView(this.#tripPoints[i]));
    }

    render(this.tripListView, this.#container);
  };
}
