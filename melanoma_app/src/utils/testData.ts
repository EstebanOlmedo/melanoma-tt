import Lesion from "../models/lesion";
import Photo from "../models/photo";
import Remainder from "../models/remainder";

import RawImage from "@/data/testBase64Image.json";
import Comparison from "@/models/comparison";
import PrediagnosisResult from "@/models/prediagnosisResult";

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
    photos.push(new Photo(i, `photo${i}`, id, new Date(), description));
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

export function getComparison(
  beforeId: number,
  afterId: number,
  parameterName: string
) {
  const photos = getPhotos(3);
  const beforeValue = 98;
  const afterValue = 93;
  return new Comparison(
    photos[0],
    photos[1],
    photos[2],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim magna, scelerisque ut fringilla in, porta a ligula. Suspendisse sed felis nibh. Cras dapibus, lacus quis finibus scelerisque, augue lacus tincidunt tortor, nec facilisis urna magna vel nisi. Donec molestie scelerisque pharetra. Nunc dictum eros justo, non aliquam massa pretium vel. Nunc dignissim ornare lorem non malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a lorem eu massa venenatis ullamcorper sit amet a risus. Aenean porta eget libero in sodales.",
    parameterName,
    beforeValue,
    afterValue
  );
}

export function getPrediagnosisResult() {
  const image = { base64: RawImage.image };
  return new PrediagnosisResult(
    0.67,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim magna, scelerisque ut fringilla in, porta a ligula. Suspendisse sed felis nibh. Cras dapibus, lacus quis finibus scelerisque, augue lacus tincidunt tortor, nec facilisis urna magna vel nisi. Donec molestie scelerisque pharetra. Nunc dictum eros justo, non aliquam massa pretium vel. Nunc dignissim ornare lorem non malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a lorem eu massa venenatis ullamcorper sit amet a risus. Aenean porta eget libero in sodales.",
    image
  );
}
