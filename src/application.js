import TripEventsFilterView from './view/trip-events-filter-view';
import {getMockFilters} from './mock/mock-filters';
import TripPresenter from './presenter/trip-presenter';
import {render} from './framework/render';
import MockPointModel from './mock/model/MockPointModel';
import MockDestinationModel from './mock/model/MockDestinationModel';
import MockOffersModel from './mock/model/MockOffersModel';

export default class Application {
  #pointModel;
  #destinationModel;
  #offersModel;

  #tripControlsFiltersComponent = document.querySelector('.trip-controls__filters');
  #tripEventsComponent = document.querySelector('.trip-events');

  #tripPresenter;
  #filtersView;

  static Mock = () =>
    new Application(
      new MockPointModel(),
      new MockDestinationModel(),
      new MockOffersModel()
    );

  constructor(pointModel, destinationModel, offersModel) {
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  #initModels = async () => {
    await this.#pointModel.init();
    await this.#destinationModel.init();
    await this.#offersModel.init();
  };

  launch = () => {
    this.#tripPresenter = new TripPresenter(this.#tripEventsComponent, this.#pointModel, this.#destinationModel, this.#offersModel);
    this.#filtersView = new TripEventsFilterView(getMockFilters());
    render(this.#filtersView, this.#tripControlsFiltersComponent);
    this.#initModels().finally(this.#tripPresenter.init);
  };
}
