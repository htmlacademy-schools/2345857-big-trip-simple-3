import TripEventsFilterView from './view/trip-events-filter-view';
import {getMockFilters} from './mock/mock-filters';
import TripPresenter from './presenter/trip-presenter';
import {render} from './framework/render';
import MockPointModel from './mock/model/mock-point-model';
import MockDestinationModel from './mock/model/mock-destination-model';
import MockOffersModel from './mock/model/mock-offers-model';
import FilterModel from './model/filter-model';
import CreatorButtonView from './view/creator-button-view';

export default class Application {
  #pointModel;
  #destinationModel;
  #offersModel;
  #filterModel;

  #tripControlsFiltersComponent = document.querySelector('.trip-controls__filters');
  #tripEventsComponent = document.querySelector('.trip-events');
  #headerComponent = document.querySelector('.trip-main');

  #tripPresenter;
  #filtersView;

  #creatorButtonView = new CreatorButtonView(() => {
    this.#tripPresenter.createEvent();
    this.#creatorButtonView.element.disabled = true;
  });

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
    this.#filterModel = new FilterModel();
  }

  #initModels = async () => {
    await this.#pointModel.init();
    await this.#destinationModel.init();
    await this.#offersModel.init();
  };

  launch = () => {
    this.#tripPresenter = new TripPresenter(
      this.#tripEventsComponent,
      this.#pointModel,
      this.#destinationModel,
      this.#offersModel,
      this.#filterModel,
      () => {
        this.#creatorButtonView.element.disabled = false;
      }
    );
    this.#filtersView = new TripEventsFilterView(getMockFilters());
    render(this.#filtersView, this.#tripControlsFiltersComponent);
    this.#initModels().finally(() => render(this.#creatorButtonView, this.#headerComponent));
    this.#tripPresenter.init();
  };
}
