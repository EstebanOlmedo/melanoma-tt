export default class Photo {
  name: string;
  createdOn: Date;
  localId: number;
  description: string;

  constructor(
    name: string,
    localId: number,
    createdOn: Date,
    description: string
  ) {
    this.name = name;
    this.createdOn = createdOn;
    this.localId = localId;
    this.description = description;
  }
}
