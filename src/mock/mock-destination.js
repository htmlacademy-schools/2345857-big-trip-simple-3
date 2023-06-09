import Destination from '../data/destination';
import { generateRandomPictures } from './mock-pictures';
import RandomUtils from './utils/random-utils';

const DEST_NAMES = ['Tokyo', 'Osaka', 'Moscow', 'New&nbsp;York', 'Seoul', 'Mondstadt', 'Inazuma', 'Sumeru&nbsp;City', 'Liyue', 'Sydney'];

export const getRandomDestination = (id) =>
  new Destination(
    id,
    RandomUtils.generateRandomDescription(),
    DEST_NAMES[id],
    generateRandomPictures()
  );

const destinations = [];

for (let i = 0; i < 10; i++) {
  destinations.push(getRandomDestination(i));
}

export const getDestination = (id) => destinations[id];
export const getAllDestinations = () => destinations;
