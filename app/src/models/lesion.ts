import Photo from "./photo";

export default class Lesion {
  name: string;
  photos: Photo[];

  constructor(name: string, photos: Photo[]) {
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
