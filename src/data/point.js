export default class Point {
  basePrice;
  dateFrom;
  dateTo;
  destination;
  id;
  offers;
  type;

  constructor(
    basePrice = 1,
    dateFrom = new Date().toISOString(),
    dateTo = new Date().toISOString(),
    destination = 1,
    id = 1,
    offers = [],
    type = 'flight'
  ) {
    this.basePrice = basePrice;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.destination = destination;
    this.id = id;
    this.offers = offers;
    this.type = type;
  }
}
