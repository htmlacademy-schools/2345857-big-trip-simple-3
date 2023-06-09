import { generateMockPoint } from '../mock/mock-point';

const POINTS = 10;

export default class TripPointModel {
  #tripPoints = Array.from({length: POINTS}, generateMockPoint);

  getTripPoints = () => this.#tripPoints;
}
