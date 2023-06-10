import {remove, render, RenderPosition} from '../framework/render.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortView from '../view/trip-events-sort-view.js';
import TripEmptyView from '../view/trip-empty-view.js';
import PointPresenter from './point-presenter';
import { sorts } from '../utils/sort.js';
import Constants from '../const';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import PreloaderView from '../view/preloader-view';
import CreatorPresenter from './creator-presenter';

export default class TripPresenter {
  #sorts = sorts;
  #tripListView = new TripEventsListView();
  #tripSortView = new TripEventsSortView(this.#sorts);
  #pointPresenters = new Map();
  #tripEventsComponent;

  #pointModel;
  #destinationModel;
  #offersModel;
  #filterModel;

  #currentSortType = Constants.SortTypes.DAY;

  #creatorPresenter;
  #onCreatorDisposeCallback;

  #uiBlocker = new UiBlocker({
    lowerLimit: Constants.TimeLimit.LOWER_LIMIT,
    upperLimit: Constants.TimeLimit.UPPER_LIMIT
  });

  #isLoading = true;

  #preloaderView = new PreloaderView();
  #emptyView = new TripEmptyView();

  constructor(tripEventsComponent, pointModel, destinationModel, offersModel, filterModel, onCreatorDisposeCallback) {
    this.#tripEventsComponent = tripEventsComponent;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#onCreatorDisposeCallback = onCreatorDisposeCallback;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointModel.points.sort(this.#sorts[this.#currentSortType]);
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #renderPoint = (tripPoint) => {
    const pointPresenter = new PointPresenter(
      this.#tripListView.element,
      tripPoint,
      () => {
        if (this.#creatorPresenter) {
          this.#handleCreatorFormClose();
        }
        this.#pointPresenters.forEach((it) => it.resetView());
      },
      this.destinations,
      this.offers,
      this.#handleUserAction
    );
    pointPresenter.init();
    this.#pointPresenters.set(tripPoint.id, pointPresenter);
  };

  #renderSortView = () => {
    render(this.#tripSortView, this.#tripEventsComponent);
    this.#tripSortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPointList = () => {
    render(this.#tripListView, this.#tripEventsComponent);
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  };

  #clearPointList = (resetSort) => {
    this.#pointPresenters.forEach((it) => it.dispose());
    this.#pointPresenters.clear();

    if (this.#emptyView) {
      remove(this.#emptyView);
    }

    if (resetSort) {
      this.#handleSortTypeChange(Constants.SortTypes.DAY);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderSortView();
    this.#renderPointList();
  };

  #handleModelEvent = (evt, data) => {
    switch (evt) {
      case Constants.UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.destinations, this.offers);
        break;
      case Constants.UpdateType.MINOR:
        this.#clearPointList();
        this.#render();
        break;
      case Constants.UpdateType.MAJOR:
        this.#clearPointList(true);
        this.#render();
        break;
      case Constants.UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#preloaderView);
        this.#clearPointList();
        this.#render();
        break;
    }
  };

  #handleUserAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case Constants.UserAction.CREATE_EVENT:
        this.#creatorPresenter.setSaving();
        try {
          await this.#pointModel.addTripPoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case Constants.UserAction.UPDATE_EVENT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updateTripPoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case Constants.UserAction.DELETE_EVENT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deleteTripPoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  init = () => this.#render();

  #renderPreloader = () => render(this.#preloaderView, this.#tripEventsComponent, RenderPosition.AFTERBEGIN);
  #renderNoEvents = () => render(this.#emptyView, this.#tripEventsComponent);

  #render = () => {
    if (this.#isLoading || !this.destinations || !this.offers) {
      this.#renderPreloader();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSortView();
    this.#renderPointList();
  };

  #handleCreatorFormClose = () => {
    this.#creatorPresenter.dispose();
    this.#creatorPresenter = null;
  };

  createEvent = () => {
    this.#currentSortType = Constants.SortTypes.DAY;
    this.#filterModel.setFilter(Constants.UpdateType.MAJOR, Constants.FilterType.EVERYTHING);
    this.#creatorPresenter = new CreatorPresenter(
      this.#tripEventsComponent,
      this.#handleUserAction,
      this.#onCreatorDisposeCallback,
      this.destinations,
      this.offers
    );
    this.#creatorPresenter.init();
  };
}
