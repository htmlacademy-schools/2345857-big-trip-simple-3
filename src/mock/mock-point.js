import Point from '../data/point';
import Constants from '../const';
import { getRandomOfferId } from './mock-offer';
import RandomUtils from './utils/random-utils';


const getRandomType = () =>
  Constants.TRIP_TYPES[RandomUtils.generateRandomInt(0, Constants.TRIP_TYPES.length - 1)];

export const generateMockPoint = () => {
  const type = getRandomType();
  return new Point(
    RandomUtils.generateRandomInt(4000, 10000),
    RandomUtils.generateRandomDate(),
    RandomUtils.generateRandomDate(),
    RandomUtils.generateRandomInt(0, 9),
    RandomUtils.generateRandomInt(0, 100),
    [getRandomOfferId(type), getRandomOfferId(type), getRandomOfferId(type)],
    type
  );
};
