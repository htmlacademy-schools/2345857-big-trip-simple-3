import { createDestination } from '../data/destination';
import { generateRandomPictures } from './mock-pictures';
import { generateRandomDescription } from './utils/random';

const DEST_NAMES = ['Tokyo', 'Osaka', 'Moscow', 'New&nbsp;York', 'Seoul', 'Mondstadt', 'Inazuma', 'Sumeru&nbsp;City', 'Liyue', 'Sydney'];

export const getRandomDestination = (id) =>
  createDestination(
    id,
    generateRandomDescription(),
    DEST_NAMES[id],
    generateRandomPictures()
  );

const destinations = [];

for (let i = 0; i < 10; i++) {
  destinations.push(getRandomDestination(i));
}

export const getDestination = (id) => destinations[id];
export const getAllDestinations = () => destinations;
