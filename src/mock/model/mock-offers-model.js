import Constants from '../../const';
import OffersByType from '../../data/offers-by-type';
import {getOffers} from '../mock-offer';

export default class MockOffersModel {
  #offers = [];

  init = () => {
    Constants.TripTypes.forEach((type) => {
      this.#offers.push(new OffersByType(type, getOffers(type)));
    });
  };

  get offers() { return this.#offers; }
}
