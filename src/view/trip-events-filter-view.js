import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (filter, current) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}"  ${filter.type === current ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}
    </label>
  </div>

`;
const createTemplate = (filters, current) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterTemplate(filter, current)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripEventsFilterView extends AbstractView {
  #filters;
  #current;
  constructor(filters, current, onFilterChangeCallback) {
    super();
    this.#filters = filters;
    this.#current = current;
    this._callback.filterChange = onFilterChangeCallback;
    this.element.addEventListener('change', (evt) => {
      evt.preventDefault();
      this._callback.filterChange(evt.target.value);
    });
  }

  get template() {
    return createTemplate(this.#filters, this.#current);
  }
}
