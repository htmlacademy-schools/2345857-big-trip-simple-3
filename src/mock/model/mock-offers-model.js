import Constants from '../../const';
import OffersByType from '../../data/offers-by-type';
import {getOffers} from '../mock-offer';
import Observable from '../../framework/observable';

export default class MockOffersModel extends Observable {
  #offers = [];

  init = async () => {
    Constants.TripTypes.forEach((type) => {
      this.#offers.push(new OffersByType(type, getOffers(type)));
    });
    this._notify(Constants.UpdateType.INIT);
  };

  get offers() { return this.#offers; }
}
