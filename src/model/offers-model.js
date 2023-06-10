import OffersByType from '../data/offers-by-type';
import Offer from '../data/offer';
import Constants from '../const';
import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #offers;
  #apiService;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      this.#offers = (await this.#apiService.offers).map(this.#createOffersByTypeObject);
    } catch (err) {
      this.#offers = [];
    }
    this._notify(Constants.UpdateType.INIT);
  };

  #createOffersByTypeObject = (offerByType) =>
    new OffersByType(offerByType.type, offerByType.offers.map(this.#createOfferObject));

  #createOfferObject = (offer) =>
    new Offer(offer.id, offer.title, offer.price);

  get offers() { return this.#offers; }
}
