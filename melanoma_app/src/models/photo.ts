export default class Photo {
  name: string;
  createdOn: Date;
  localId: number;

  constructor(name: string, localId: number, createdOn: Date) {
    this.name = name;
    this.createdOn = createdOn;
    this.localId = localId;
  }
}
