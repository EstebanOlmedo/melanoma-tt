import Photo from "./photo";

export default class Lesion {
  id: number;
  name: string;
  photos: Photo[];

  constructor(id: number, name: string, photos: Photo[]) {
    this.id = id;
    this.name = name;
    this.photos = photos;
  }

  getLastUpdatedLabel() {
    let minDate = new Date(0);
    this.photos.forEach((photo: Photo) => {
      if (minDate < photo.createdOn) {
        minDate = photo.createdOn;
      }
    });
    return minDate.toLocaleDateString();
  }

  getFirstPhoto() {
    return this.photos[0];
  }
}
