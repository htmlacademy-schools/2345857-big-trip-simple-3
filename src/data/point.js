import Offer from './offer';

export default class Point {
  basePrice = 0;
  dateFrom = Date.now();
  dateTo = Date.now();
  destination = '';
  id = 0;
  offers = [new Offer()];
  type = '';

  constructor(basePrice, dateFrom, dateTo, destination, id, offers, type) {
    this.basePrice = basePrice;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.destination = destination;
    this.id = id;
    this.offers = offers;
    this.type = type;
  }
}
