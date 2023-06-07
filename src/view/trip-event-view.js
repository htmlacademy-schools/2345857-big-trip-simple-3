import { getDestination } from '../mock/mock-destination.js';
import { getOffers } from '../mock/mock-offer.js';
import { convertToDateTime, convertToEventDate, convertToEventDateTime, convertToTime } from '../utils/converters.js';
import AbstractView from './abstract-view.js';

const createOfferTemplates = (offers) =>
  offers.map((it) => `
    <li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      &plus;<span class="event__offer-price">${it.price}</span>&euro;
    </li>
  `).join('\n');

const createTemplate = (point) => {
  const { destination, offers, type, basePrice } = point;

  // Получаем направления и опции по их ID
  const destinationObj = getDestination(destination);
  const offerObjs = getOffers(type).filter((it) => (it.id in offers));

  // Даты и время
  const eventDateTime = convertToEventDateTime(point.dateFrom);
  const eventDate = convertToEventDate(point.dateFrom);
  const fromDateTime = convertToDateTime(point.dateFrom);
  const fromTime = convertToTime(point.dateFrom);
  const toDateTime = convertToDateTime(point.dateTo);
  const toTime = convertToTime(point.dateTo);

  // Создаем темплейты для опций
  const offerTemplates = createOfferTemplates(offerObjs);

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

export default class TripEventView extends AbstractView {
  #tripPoint = null;

  constructor(tripPoint) {
    super();
    this.#tripPoint = tripPoint;
  }

  getTemplate = () => createTemplate(this.#tripPoint);
}
