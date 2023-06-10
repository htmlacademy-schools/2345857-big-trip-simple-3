import Converters from '../utils/converters.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import OffersByType from '../data/offers-by-type';
import Destination from '../data/destination';
import Constants from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const getTitle = (isEditForm, isDeleting) => {
  if (!isEditForm) {
    return 'Cancel';
  }
  return (isDeleting) ? 'Deleting...' : 'Delete';
};

const createDestinationTemplates = (destinations) =>
  destinations.map((it) => `<option value=${it.name}></option>`).join('');

const createPictureTemplates = (pictures) =>
  pictures.map((it) => `<img class="event__photo" src="${it.src}" alt="${it.description}">`).join('');

const createEventTypeListItem = (id, type, checked = false) =>
  `<div class="event__type-item">
     <input class="event__type-input  visually-hidden" id="event-type-${type}-${id}" name="event-type" type="radio" value="${type}" ${checked && 'checked'}>
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
  </div>`;

const createEventTypeList = (id, currentType) =>
  `<div class="event__type-list">
     <fieldset class="event__type-group">
       <legend class="visually-hidden">Event type</legend>
       ${Object.values(Constants.TripTypes).map((type) => createEventTypeListItem(id, type, currentType === type)).join('')}
     </fieldset>
  </div>`;

const createEventOfferSelector = (id, offer, isSelected = false) =>
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${id}" type="checkbox" name="event-offer-${offer.id}" ${isSelected && 'checked'}>
      <label class="event__offer-label" for="event-offer-${offer.id}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;

const createEventOffersList = (id, selection, offers) =>
  `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offers.map((offer) => createEventOfferSelector(id, offer, selection.includes(offer.id))).join('')}
    </div>
  </section>`;

const createTemplate = (point, destinations, offers, isEdit) => {
  const { type, id } = point;

  const destination = Destination.findDestinationById(destinations, point.destination);

  const destinationsTemplates = createDestinationTemplates(destinations);

  const usableOffers = OffersByType.findOffersForType(offers, type);
  const usableOffersArray = usableOffers ? usableOffers.offers : [];

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
        ${createEventTypeList(id, type)}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${destinationsTemplates}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${Converters.convertToFormDate(point.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${Converters.convertToFormDate(point.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${point.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit"${(point.isDisabled) ? 'disabled' : ''}>${(point.isSaving) ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${(point.isDisabled) ? 'disabled' : ''}>${getTitle(isEdit, point.isDeleting)}</button>
    </header>
    <section class="event__details">
      ${createEventOffersList(id, point.offers, usableOffersArray)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPictureTemplates(destination.pictures)}
          </div>
        </div>
      </section>
    </section>
  </form>`;
};

const typeGroupSelector = '.event__type-group';
const destinationSelector = '.event__input--destination';
const priceSelector = '.event__input--price';
const availableOffersSelector = '.event__available-offers';
const rollupSelector = '.event__rollup-btn';
const resetSelector = '.event__reset-btn';

export default class TripEventsFormView extends AbstractStatefulView {
  #point;
  #destinations;
  #offers;
  #isEdit;
  #fromDatePicker;
  #toDatePicker;

  constructor(point, destinations, offers, onSaveCallback, onResetCallback, onDeleteCallback, isEdit) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this._callback.onSave = onSaveCallback;
    this._callback.onReset = onResetCallback;
    this._callback.onDelete = onDeleteCallback;
    this.#isEdit = isEdit;

    this._setState(TripEventsFormView.pointAsState(point, offers));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#saveHandler);
    this.element.querySelector(typeGroupSelector).addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector(destinationSelector).addEventListener('change', this.#destinationHandler);
    this.element.querySelector(priceSelector).addEventListener('input', this.#priceInputHandler);
    this.element.querySelector(availableOffersSelector).addEventListener('change', this.#offersHandler);
    this.element.querySelector(resetSelector).addEventListener('click', this.#deleteHandler);
    if (this.#isEdit) {
      this.element.querySelector(rollupSelector).addEventListener('click', this.#resetHandler);
    }
    this.#setFromDatePicker();
    this.#setToDatePicker();
  }

  get template() {
    return createTemplate(this._state, this.#destinations, this.#offers);
  }

  reset = (tripEvent) => {
    this.updateElement(
      TripEventsFormView.pointAsState(tripEvent, this.#offers)
    );
  };

  #setFromDatePicker() {
    this.#fromDatePicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: Converters.convertToFormDate(this._state.dateFrom),
        onChange: this.#fromDateChangeHandler,
      },
    );
  }

  #setToDatePicker() {
    this.#toDatePicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: Converters.convertToFormDate(this._state.dateTo),
        minDate: Converters.convertToFormDate(this._state.dateFrom),
        onChange: this.#toDateChangeHandler,
      },
    );
  }

  #fromDateChangeHandler = ([date]) => {
    if (date) {
      this._setState({
        dateFrom: date.toISOString(),
      });
      this.#toDatePicker.set('minDate', date);
    }
  };

  #toDateChangeHandler = ([date]) => {
    if (date) {
      this._setState({
        dateTo: date.toISOString(),
      });
    }
  };

  #offersHandler = (evt) => {
    evt.preventDefault();
    const clickedOfferId = Number(evt.target.name.split('-').at(-1));
    const newOffersIds = this._state.offers.slice();
    if (newOffersIds.includes(clickedOfferId)) {
      newOffersIds.splice(newOffersIds.indexOf(clickedOfferId), 1);
    } else {
      newOffersIds.push(clickedOfferId);
    }
    this._setState({
      offers: newOffersIds
    });
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
      offersForType: OffersByType.findOffersForType(this.#offers, evt.target.value).offers
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #destinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: Destination.findDestinationByName(this.#destinations, evt.target.value).id,
    });
  };

  #deleteHandler = (evt) => {
    if (!this.#isEdit) {
      this.#resetHandler(evt);
      return;
    }
    evt.preventDefault();
    this._callback.onDelete(TripEventsFormView.stateAsPoint(this._state));
  };

  #saveHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSave(TripEventsFormView.stateAsPoint(this._state));
  };

  #resetHandler = (evt) => {
    evt.preventDefault();
    this._callback.onReset();
  };

  static pointAsState(point, offers) {
    const offersForType = OffersByType.findOffersForType(offers, point.type);
    return {
      ...point,
      offersForType : offersForType ? offersForType.offers : [],
      isDisabled : false,
      isSaving : false,
      isDeleting : false,
    };
  }

  static stateAsPoint(state) {
    const point = {...state};
    delete point.offersForType;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
