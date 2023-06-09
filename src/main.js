import PointModel from './model/point-model.js';
import TripAPIService from './services/TripAPIService';
import Constants from './const';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offers-model';
import Application from './application';

const MOCK_LAUNCH = true;

if (MOCK_LAUNCH) {
  Application.Mock().launch();
} else {
  const apiService = new TripAPIService(Constants.API_ENDPOINT, Constants.AUTHORIZATION_HEADER);

  new Application(
    new PointModel(apiService),
    new DestinationModel(apiService),
    new OffersModel(apiService)
  ).launch();
}
