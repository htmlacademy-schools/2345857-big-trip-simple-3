import { render } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripEventsFilterView from './view/trip-events-filter-view.js';
import TripPointModel from './model/trip-point-model.js';

const tripControlsFiltersComponent = document.querySelector('.trip-controls__filters');
const tripEventsComponent = document.querySelector('.trip-events');

const tripPointsModel = new TripPointModel();
const tripPresenter = new TripPresenter(tripEventsComponent, tripPointsModel);

render(new TripEventsFilterView(), tripControlsFiltersComponent);

tripPresenter.init();
