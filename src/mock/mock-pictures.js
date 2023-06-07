import { createPicture } from '../data/picture';
import { generateRandomDescription, generateRandomInt, getRandomPictureUrl } from './utils/random';

export const generateRandomPictures = () => {
  const pictures = [];
  for (let i = 0; i < generateRandomInt(2, 5); i++) {
    pictures.push(createPicture(getRandomPictureUrl(), generateRandomDescription()));
  }
  return pictures;
};
