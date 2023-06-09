export default class OffersModel {
  #offers;
  #apiService;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  };

  get offers() { return this.#offers; }
}
