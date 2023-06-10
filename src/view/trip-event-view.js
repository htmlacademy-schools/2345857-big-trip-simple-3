import Converters from '../utils/converters.js';
import AbstractView from '../framework/view/abstract-view';
import Point from '../data/point';

const createOfferTemplates = (offers) =>
  offers.map((it) => `
    <li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      &plus;<span class="event__offer-price">${it.price}</span>&euro;
    </li>
  `).join('\n');

const createTemplate = (point, destinations, offersDict) => {
  const { offers, type, basePrice } = point;

  // Получаем направления и опции по их ID
  const destinationObj = destinations.find((it) => it.id === point.destination);
  const offerObjs = offersDict.find((e) => e.type === type) || { offers: [] };

  // Даты и время
  const eventDateTime = Converters.convertToEventDateTime(point.dateFrom);
  const eventDate = Converters.convertToEventDate(point.dateFrom);
  const fromDateTime = Converters.convertToDateTime(point.dateFrom);
  const fromTime = Converters.convertToTime(point.dateFrom);
  const toDateTime = Converters.convertToDateTime(point.dateTo);
  const toTime = Converters.convertToTime(point.dateTo);

  // Создаем темплейты для опций
  const offerTemplates = createOfferTemplates(offerObjs.offers.filter((it) => offers.includes(it.id)));

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinationObj.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${fromDateTime}">${fromTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${toDateTime}">${toTime}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerTemplates}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

const rollupSelector = '.event__rollup-btn';

export default class TripEventView extends AbstractView {
  #tripPoint = null;
  #destinations = null;
  #offers = null;

  constructor(point, destinations, offers, onRollupClickCallback) {
    super();
    this.#tripPoint = point ? point : new Point();
    this.#destinations = destinations;
    this.#offers = offers;
    this._callback.rollupClick = onRollupClickCallback;
    this.element.querySelector(rollupSelector).addEventListener('click', this._callback.rollupClick);
  }

  get template() {
    return createTemplate(this.#tripPoint, this.#destinations, this.#offers);
  }
}
