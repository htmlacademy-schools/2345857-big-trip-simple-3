import AbstractView from '../framework/view/abstract-view';

const createSortTemplate = (sort) =>
  `<div class="trip-sort__item  trip-sort__item--${sort}">
    <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}">
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
}
