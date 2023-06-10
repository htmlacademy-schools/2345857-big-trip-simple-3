import {remove, render, replace} from '../framework/render';
import TripEventView from '../view/trip-event-view';
import TripEventsFormView from '../view/trip-events-form-view';
import {compareDate} from '../utils/sort';
import Constants from '../const';

const UiState = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #uiState = UiState.DEFAULT;
  #container;

  #tripView;
  #tripFormView;

  #point;
  #destinations;
  #offers;

  #onDataChangeCallback;

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

  constructor(container, point, onStateChangeCallback, destinations, offers, onDataChangeCallback) {
    this.#container = container;
    this.#onStateChangeCallback = onStateChangeCallback;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChangeCallback = onDataChangeCallback;
  }

  #replacePointToForm = () => {
    replace(this.#tripFormView, this.#tripView);
    document.body.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
  };

  #replaceFormToPoint = () => {
    replace(this.#tripView, this.#tripFormView);
    document.body.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
  };

  setSaving = () => {
    if (this.uiState === UiState.EDITING) {
      this.#tripFormView.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.uiState === UiState.EDITING) {
      this.#tripFormView.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.uiState === UiState.DEFAULT) {
      this.#tripFormView.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripFormView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripFormView.shake(resetFormState);
  };

  #closeEditFormOnEscapeKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.uiState = UiState.DEFAULT;
    }
  };

  #handleSave = (evt) => {
    const isMinorUpdate = compareDate(this.#point.dateFrom, evt.dateFrom) !== 0 || this.#point.basePrice !== evt.basePrice;
    this.#onDataChangeCallback(
      Constants.UserAction.UPDATE_EVENT,
      isMinorUpdate ? Constants.UpdateType.MINOR : Constants.UpdateType.PATCH,
      evt,
    );
  };

  #handleDeleteClick = (evt) => {
    this.#onDataChangeCallback(
      Constants.UserAction.DELETE_EVENT,
      Constants.UpdateType.MINOR,
      evt,
    );
  };

  init() {
    this.#tripFormView = new TripEventsFormView(
      this.#point,
      this.#destinations,
      this.#offers,
      (evt) => {
        this.#handleSave(evt);
      },
      () => {
        this.uiState = UiState.DEFAULT;
      },
      (evt) => {
        this.#handleDeleteClick(evt);
      }
    );

    this.#tripView = new TripEventView(
      this.#point,
      this.#destinations,
      this.#offers,
      (evt) => {
        evt.preventDefault();
        this.uiState = UiState.EDITING;
      }
    );

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
