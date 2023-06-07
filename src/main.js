import { render } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripEventsFilterView from './view/trip-events-filter-view.js';

const tripControlsFiltersComponent = document.querySelector('.trip-controls__filters');
const tripEventsComponent = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter();

render(new TripEventsFilterView(), tripControlsFiltersComponent);

tripPresenter.init(tripEventsComponent);
