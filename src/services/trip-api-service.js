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

export default class TripApiService extends ApiService {
  #getResultFromEndpoint = (endpoint) => this._load({url: endpoint}).then(ApiService.parseResponse);
  get points() { return this.#getResultFromEndpoint(POINTS_ENDPOINT); }
  get destinations() { return this.#getResultFromEndpoint(DESTINATIONS_ENDPOINT); }
  get offers() { return this.#getResultFromEndpoint(OFFERS_ENDPOINT); }

  updateTripEvent = async (tripPoint) => await ApiService.parseResponse(await this._load({
    url: `points/${tripPoint.id}`,
    method: HttpMethods.PUT,
    body: JSON.stringify(this.#createRequestObject(tripPoint)),
    headers: new Headers({'Content-Type': 'application/json'}),
  }));

  addTripEvent = async (tripPoint) => await ApiService.parseResponse(await this._load({
    url: 'points',
    method: HttpMethods.POST,
    body: JSON.stringify(this.#createRequestObject(tripPoint)),
    headers: new Headers({'Content-Type': 'application/json'}),
  }));

  deleteTripEvent = async (tripPoint) => await this._load({
    url: `points/${tripPoint.id}`,
    method: HttpMethods.DELETE,
  });

  #createRequestObject = (point) => {
    const object = {
      ...point,
      'date_from': (point.dateFrom) ? new Date(point.dateFrom).toISOString() : new Date().toISOString,
      'date_to': (point.dateTo) ? new Date(point.dateTo).toISOString() : new Date().toISOString,
      'base_price': Number(point.basePrice),
    };

    delete object.dateFrom;
    delete object.dateTo;
    delete object.basePrice;

    return object;
  };
}
