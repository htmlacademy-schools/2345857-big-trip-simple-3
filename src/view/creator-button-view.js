import AbstractView from '../framework/view/abstract-view';

const createTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class CreatorButtonView extends AbstractView {
  constructor(onClickCallback) {
    super();
    this._callback.onClick = onClickCallback;
    this.element.addEventListener('click', this._callback.onClick);
  }

  get template() {
    return createTemplate();
  }
}
