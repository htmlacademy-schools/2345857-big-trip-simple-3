import {remove, render, replace} from '../framework/render';
import TripEventView from '../view/trip-event-view';
import TripEventsFormView from '../view/trip-events-form-view';

const UiState = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #uiState = UiState.DEFAULT;
  #container;

  #tripView;
  #tripFormView;

  #destinations;
  #offers;

  #onStateChangeCallback = () => {};

  get uiState() { return this.#uiState; }

  set uiState(value) {
    switch (value) {
      case UiState.DEFAULT: {
        this.#replaceFormToPoint();
        break;
      }
      case UiState.EDITING: {
        this.#onStateChangeCallback();
        this.#replacePointToForm();
        break;
      }
    }
    this.#uiState = value;
  }

  constructor(container, point, onStateChangeCallback, destinations, offers) {
    this.#container = container;
    this.#tripView = new TripEventView(point, destinations, offers);
    this.#tripFormView = new TripEventsFormView(point, destinations, offers);
    this.#onStateChangeCallback = onStateChangeCallback;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  #replacePointToForm = () => {
    replace(this.#tripFormView, this.#tripView);
    document.body.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
  };

  #replaceFormToPoint = () => {
    replace(this.#tripView, this.#tripFormView);
    document.body.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
  };

  #closeEditFormOnEscapeKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.uiState = UiState.DEFAULT;
    }
  };

  init() {
    this.#tripView.setRollupClickHandler(() => {
      this.uiState = UiState.EDITING;
    });

    this.#tripFormView.setSaveClickHandler((evt) => {
      evt.preventDefault();
      this.uiState = UiState.DEFAULT;
    });

    this.#tripFormView.setResetClickHandler(() => {
      this.uiState = UiState.DEFAULT;
    });

    render(this.#tripView, this.#container);
  }

  dispose() {
    remove(this.#tripView);
    remove(this.#tripFormView);
  }

  resetView() {
    if (this.uiState !== UiState.DEFAULT) {
      this.uiState = UiState.DEFAULT;
    }
  }
}
