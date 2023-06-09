import Picture from '../data/picture';
import RandomUtils from './utils/random-utils';

export const generateRandomPictures = () => {
  const pictures = [];
  for (let i = 0; i < RandomUtils.generateRandomInt(2, 5); i++) {
    pictures.push(new Picture(RandomUtils.getRandomPictureUrl(), RandomUtils.generateRandomDescription()));
  }
  return pictures;
};
