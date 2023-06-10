import Offer from './offer';

export default class OffersByType {
  type = '';
  offers = [new Offer()];

  constructor(type, offers) {
    this.type = type;
    this.offers = offers;
  }

  static findOffersForType = (offers, type) => offers.find((it) => it.type === type);
}
