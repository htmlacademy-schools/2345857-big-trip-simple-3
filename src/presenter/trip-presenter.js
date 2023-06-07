import { render } from '../render.js';

import TripEventsFormView from '../view/trip-events-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';

export default class TripPresenter {
  tripListView = new TripEventsListView();
  #container = null;

  init = (container) => {
    this.#container = container;

    render(new TripEventsSortView(), this.#container);

    this.tripListView.addComponent(new TripEventsFormView());

    for (let i = 0; i < 3; i++) {
      this.tripListView.addComponent(new TripEventView());
    }

    render(this.tripListView, this.#container);
  };
}
