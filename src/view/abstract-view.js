import { createElement } from '../render.js';

export default class AbstractView {
  #element = null;

  get template() {
    throw new Error('Tried to call abstract method.');
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
