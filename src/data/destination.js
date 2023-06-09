export default class Destination {
  id = 0;
  description = '';
  name = '';
  pictures = [];

  constructor(id, description, name, pictures) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.pictures = pictures;
  }
}
