import AbstractView from '../framework/view/abstract-view';
import Constants from '../const';

const createSortTemplate = (sort) =>
  `<div class="trip-sort__item  trip-sort__item--${sort}">
    <input
      id="sort-${sort}"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${sort}"
      ${sort === Constants.SortTypes.DAY ? 'checked' : ''}
      ${sort in {event: '', offers: ''} ? 'disabled' : ''}
      >
    <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
  </div>`;

const createTemplate = (sorts) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.keys(sorts).map((sort) => createSortTemplate(sort)).join('')}
  </form>
`;

export default class TripEventsSortView extends AbstractView {
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createTemplate(this.#sorts);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', (evt) => {
      if (evt.target.tagName !== 'INPUT') {
        return;
      }
      this._callback.sortTypeChange(evt.target.id.replace('sort-',''));
    });
  }
}
