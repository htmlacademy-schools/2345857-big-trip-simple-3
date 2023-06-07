import { generateMockPoint } from '../mock/mock-point';

const POINTS = 3;

export default class TripPointModel {
  #tripPoints = Array.from({length: POINTS}, generateMockPoint);

  getTripPoints = () => []; // this.#tripPoints;
}
