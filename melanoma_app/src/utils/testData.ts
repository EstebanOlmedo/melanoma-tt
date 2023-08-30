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
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar volutpat purus, in ultrices odio viverra eget. Duis pharetra dui quis arcu sollicitudin pharetra. Fusce eleifend, risus elementum suscipit commodo, tellus tellus ultricies tellus, ac pellentesque quam mi non purus. Duis posuere eros vitae quam vestibulum, vel feugiat tortor mattis. Duis elit ipsum, hendrerit at malesuada ut, sollicitudin at lorem. Phasellus ac est at tortor accumsan posuere. Vivamus finibus aliquet tellus in fermentum. Vestibulum ullamcorper risus sem, et euismod dui maximus eget. Donec varius urna sit amet nisi dictum ultricies. Vestibulum ullamcorper risus sem, et euismod dui maximus eget. Donec varius urna sit amet nisi dictum ultricies.";
  const photos = [];
  const id = Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    photos.push(new Photo(`photo${i}`, id, new Date(), description));
  }
  return photos;
}

export function getLesions() {
  const lesions = [
    new Lesion(0, "Brazo", getPhotos(1)),
    new Lesion(1, "Espalda", getPhotos(3)),
    new Lesion(2, "Mejilla", getPhotos(5)),
    new Lesion(3, "Cara", getPhotos(5)),
    new Lesion(4, "Espalda", getPhotos(5)),
    new Lesion(5, "Pierna", getPhotos(15)),
    new Lesion(6, "Abdomen", getPhotos(5)),
    new Lesion(7, "Mano", getPhotos(20)),
  ];
  return lesions;
}
