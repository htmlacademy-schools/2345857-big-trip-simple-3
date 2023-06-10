import TripEventsFormView from '../view/trip-events-form-view';
import Point from '../data/point';
import {remove, render, RenderPosition} from '../framework/render';
import Constants from '../const';

export default class CreatorPresenter {
  #tripEventsComponent;
  #formView;

  #onChangeCallback;
  #onDisposeCallback;

  #destinations;
  #offers;

  constructor(tripEventsComponent, onChangeCallback, onDisposeCallback, destinations, offers) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#onChangeCallback = onChangeCallback;
    this.#onDisposeCallback = onDisposeCallback;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init = () => {
    if (this.#formView) {
      return;
    }

    this.#formView = new TripEventsFormView(
      new Point(),
      this.#destinations,
      this.#offers,
      this.#onSubmit,
      this.#onDelete,
      this.#onDelete,
    );

    render(this.#formView, this.#tripEventsComponent, RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#escapeKeyHandler);
  };

  #onSubmit = (tripEvent) => {
    this.#onChangeCallback(
      Constants.UserAction.CREATE_EVENT,
      Constants.UpdateType.MINOR,
      this.#deleteId(tripEvent)
    );
    this.dispose();
  };

  #onDelete = () => {
    this.dispose();
  };

  #deleteId = (tripEvent) => {
    delete tripEvent.id;
    return tripEvent;
  };

  setSaving() {
    this.#formView.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formView.shake(resetFormState);
  }

  dispose() {
    if (this.#formView === null) {
      return;
    }

    this.#onDisposeCallback();

    remove(this.#formView);
    this.#formView = null;

    document.body.removeEventListener('keydown', this.#escapeKeyHandler);
  }

  #escapeKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.dispose();
    }
  };
}
