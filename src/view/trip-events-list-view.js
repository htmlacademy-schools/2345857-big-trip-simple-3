import AbstractView from '../framework/view/abstract-view';
import { createElement, render } from '../framework/render.js';

const createListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;

const createItemTemplate = () => `
  <li class="trip-events__item"></li>
`;

export default class TripEventsListView extends AbstractView {
  get template() {
    return createListTemplate();
  }

  addComponent(component) {
    const itemTemplate = createElement(createItemTemplate());
    render(component, itemTemplate);
    this.element.append(itemTemplate);
  }
}
