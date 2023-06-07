const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

export const generateRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomPictureUrl = () =>
  `https://picsum.photos/248/152?r=${generateRandomInt(0,2000)}`;

export const generateRandomDate = () => {
  const time = Math.floor(Math.random() * Date.now());
  return new Date(time).toISOString();
};

export const generateRandomDescription = () =>
  LOREM_IPSUM.split('.')[generateRandomInt(0, LOREM_IPSUM.split('.').length - 1)];
