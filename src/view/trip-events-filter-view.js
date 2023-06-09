import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (filter) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
        <label class="trip-filters__filter-label" for="filter-${filter}">${filter}
    </label>
  </div>

`;
const createTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    ${Object.keys(filters).map((filter) => createFilterTemplate(filter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripEventsFilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTemplate(this.#filters);
  }
}
