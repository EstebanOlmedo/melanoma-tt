import Lesion from "../models/lesion";
import Photo from "../models/photo";
import Remainder from "../models/remainder";

export function getRemainders() {
  const remainders = [
    new Remainder("Brazo", new Date()),
    new Remainder("Pierna", new Date()),
    new Remainder("Estomago", new Date()),
    new Remainder("Mano derecha", new Date()),
  ];
  return remainders;
}

export function getPhotos(count: number) {
  const photos = [];
  const id = Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    photos.push(new Photo(`photo${i}`, id, new Date()));
  }
  return photos;
}

export function getLesions() {
  const lesions = [
    new Lesion("Brazo", getPhotos(1)),
    new Lesion("Espalda", getPhotos(3)),
    new Lesion("Mejilla", getPhotos(5)),
    new Lesion("Cara", getPhotos(5)),
    new Lesion("Espalda", getPhotos(5)),
    new Lesion("Pierna", getPhotos(5)),
    new Lesion("Abdomen", getPhotos(5)),
    new Lesion("Mano", getPhotos(5)),
  ];
  return lesions;
}
