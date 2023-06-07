import { createElement } from '../render.js';

export default class AbstractView {
  #element = null;

  getTemplate() {
    throw new Error('Tried to call abstract method.');
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
