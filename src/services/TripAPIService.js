import ApiService from '../framework/api-service';

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUSH',
  DELETE: 'DELETE'
};

const POINTS_ENDPOINT = 'points';
const DESTINATIONS_ENDPOINT = 'destinations';
const OFFERS_ENDPOINT = 'offers';

export default class TripAPIService extends ApiService {
  #getResultFromEndpoint = (endpoint) => this._load({url: endpoint}).then(ApiService.parseResponse);
  get points() { return this.#getResultFromEndpoint(POINTS_ENDPOINT); }
  get destinations() { return this.#getResultFromEndpoint(DESTINATIONS_ENDPOINT); }
  get offers() { return this.#getResultFromEndpoint(OFFERS_ENDPOINT); }
}
