export default class Constants {
  static AUTHORIZATION_HEADER = 'Basic argraur';

  static API_ENDPOINT = 'https://18.ecmascript.pages.academy/big-trip';

  static TripTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  static SortTypes = {
    DAY: 'day',
    EVENT: 'event',
    TIME: 'time',
    PRICE: 'price',
    OFFERS: 'offers'
  };

  static UserAction = {
    UPDATE_EVENT: 'UPDATE_EVENT',
    CREATE_EVENT: 'CREATE_EVENT',
    DELETE_EVENT: 'DELETE_EVENT',
  };

  static UpdateType = {
    INIT: 'INIT',
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
  };

  static TimeLimit = {
    LOWER_LIMIT: 350,
    UPPER_LIMIT: 1000,
  };

  static FilterType = {
    EVERYTHING: 'everything',
    FUTURE: 'future'
  };
}
