import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';

export default class Converters {
  static convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
  static convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
  static convertToDateTime = (date) => date.substring(0, date.indexOf('.'));
  static convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
  static convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
  static convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);
}

