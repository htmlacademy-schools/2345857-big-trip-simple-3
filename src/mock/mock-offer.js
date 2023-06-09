import Offer from '../data/offer';
import RandomUtils from './utils/random-utils';

export const OFFER_TITLES = [];

OFFER_TITLES['taxi'] = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Choose temperature',
  'Drive quickly, I\'m in a hurry',
  'Drive slowly'
];

OFFER_TITLES['bus'] = [
  'Infotainment system',
  'Order meal',
  'Choose seats'
];

OFFER_TITLES['train'] = [
  'Book a taxi at the arrival point',
  'Order a breakfast',
  'Wake up at a certain time'
];

OFFER_TITLES['ship'] = [
  'Choose meal',
  'Choose seats',
  'Upgrade to comfort class',
  'Upgrade to business class',
  'Add luggage',
  'Business lounge'
];

OFFER_TITLES['drive'] = [
  'With automatic transmission',
  'With air conditioning'
];

OFFER_TITLES['flight'] = [
  'Choose meal',
  'Choose seats',
  'Upgrade to comfort class',
  'Upgrade to business class',
  'Add luggage',
  'Business lounge'
];

OFFER_TITLES['check-in'] = [
  'Choose the time of check-in',
  'Choose the time of check-out',
  'Add breakfast',
  'Get laundry service',
  'Order a meal from the restaurant'
];

OFFER_TITLES['sightseeing'] = [
  'Comfortable sightseeing bus',
  'Photography service',
  'Audio guide'
];

OFFER_TITLES['restaurant'] = [
  'Choose live music',
  'Choose VIP area',
  'Get golden steak'
];

const generateRandomOffer = (id, type) =>
  new Offer(
    id,
    OFFER_TITLES[type][id],
    RandomUtils.generateRandomInt(100, 1000),
  );

export const getOffers = (type) => {
  const offers = [];
  for (let i = 0; i < OFFER_TITLES[type].length; i++) {
    offers.push(generateRandomOffer(i, type));
  }
  return offers;
};

export const getRandomOfferId = (type) =>
  RandomUtils.generateRandomInt(0, OFFER_TITLES[type].length);
