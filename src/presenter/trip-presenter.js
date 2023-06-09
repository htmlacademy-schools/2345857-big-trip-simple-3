import { render, replace } from '../framework/render.js';

import TripEventsFormView from '../view/trip-events-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';
import TripEmptyView from '../view/trip-empty-view.js';

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

    const replacePointToForm = () => replace(tripFormView, tripView);

    const replaceFormToPoint = () => replace(tripView, tripFormView);

    const closeEditFormOnEscapeKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
      }
    };

    tripView.setRollupClickHandler(() => {
      replacePointToForm();
      document.body.addEventListener('keydown', closeEditFormOnEscapeKey);
    });

    tripFormView.setSaveClickHandler((evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
    });

    tripFormView.setResetClickHandler(() => {
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
    });

    render(tripView, this.#tripListView.element);
  };

  init = () => {
    if (this.#tripPoints.length !== 0) {
      render(new TripEventsSortView(), this.#tripEventsComponent);
      render(this.#tripListView, this.#tripEventsComponent);
      for (let i = 0; i < 3; i++) {
        this.#renderTripPoint(this.#tripPoints[i]);
      }
    } else {
      render(new TripEmptyView(), this.#tripEventsComponent);
    }
  };
}
