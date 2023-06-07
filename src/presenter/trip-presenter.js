import { render } from '../render.js';

import TripEventsFormView from '../view/trip-events-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';

export default class TripPresenter {
  #tripListView = new TripEventsListView();
  #tripEventsComponent = null;
  #tripPoints = null;
  #tripPointsModel = null;

  constructor(tripEventsComponent, tripPointsModel) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  #renderTripPoint = (tripPoint) => {
    const tripView = new TripEventView(tripPoint);
    const tripFormView = new TripEventsFormView(tripPoint);

    const replacePointToForm = () => {
      this.#tripListView.element.replaceChild(tripFormView.element, tripView.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListView.element.replaceChild(tripView.element, tripFormView.element);
    };

    const closeEditFormOnEcsapeKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', closeEditFormOnEcsapeKey);
      }
    };

    tripView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.body.addEventListener('keydown', closeEditFormOnEcsapeKey);
    });

    tripFormView.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEcsapeKey);
    });

    tripFormView.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEcsapeKey);
    });

    render(tripView, this.#tripListView.element);
  };

  init = () => {
    render(new TripEventsSortView(), this.#tripEventsComponent);
    render(this.#tripListView, this.#tripEventsComponent);
    for (let i = 0; i < 3; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  };
}
