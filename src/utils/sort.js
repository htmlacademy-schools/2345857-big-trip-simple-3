import Constants from '../const';
import dayjs from 'dayjs';

export const compareDate = (a, b) => dayjs(a).toDate() - dayjs(b).toDate();
const compareTime = (a, b) => {
  const aDate = dayjs(a);
  const bDate = dayjs(b);

  if (aDate.hour() > bDate.hour()) {
    return bDate.hour() - aDate.hour();
  }

  return aDate.minute() - bDate.minute();
};

const sortByDay = (a, b) => compareDate(a.dateFrom, b.dateFrom);
const sortByTime = (a, b) => compareTime(a.dateFrom, b.dateFrom);
const sortByPrice = (a, b) => b.basePrice - a.basePrice;

export const sorts = {
  [Constants.SortTypes.DAY]: sortByDay,
  [Constants.SortTypes.EVENT]: undefined,
  [Constants.SortTypes.TIME]: sortByTime,
  [Constants.SortTypes.PRICE]: sortByPrice,
  [Constants.SortTypes.OFFERS]: undefined,
};
