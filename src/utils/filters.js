import Converters from './converters';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((it) => !Converters.isTripDateInPast(it.dateFrom))
};

export const getFilters = () =>
  filters;
