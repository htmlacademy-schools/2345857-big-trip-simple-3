import AbstractView from '../framework/view/abstract-view';

const createTemplate = () =>
  '<p class="trip-events__msg">Loading...</p>';

export default class PreloaderView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
