import { createPoint } from '../data/point';
import { TRIP_TYPES } from '../data/tripTypes';
import { getRandomOfferId } from './mock-offer';
import { generateRandomDate, generateRandomInt } from './utils/random';


const getRandomType = () =>
  TRIP_TYPES[generateRandomInt(0, TRIP_TYPES.length - 1)];

export const generateMockPoint = () => {
  const type = getRandomType();
  return createPoint(
    generateRandomInt(4000, 10000),
    generateRandomDate(),
    generateRandomDate(),
    generateRandomInt(0, 10),
    generateRandomInt(0, 100),
    [getRandomOfferId(type), getRandomOfferId(type), getRandomOfferId(type)],
    type
  );
};
