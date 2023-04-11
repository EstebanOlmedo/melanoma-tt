import os
import cv2
from .noise_removal import (
    dull_razor,
    median_filtering,
    otsu_method, closing,
    and_bitwise,
    chan_vese_segmentation,
    invert_bitwise,
    opening,
)
from .testing import get_mssism

IMAGE_PATH = os.path.join(os.path.dirname(__file__), "./img/")
IMAGES_NAMES = [
    # "example2.jpg",
    # "example3.jpg",
    # "example4.jpg",
    "example5.jpg",
    "example6.jpg",
    # "melColor.jpg",
]
IMG_SIZE = 200

def main():
    for i, name in enumerate(IMAGES_NAMES):
        img = cv2.imread(IMAGE_PATH + name, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

        processed_img, _bhf = dull_razor(img)
        blurred_image = median_filtering(processed_img)
        segmented_image = otsu_method(blurred_image)
        segmented_image = invert_bitwise(chan_vese_segmentation(invert_bitwise(segmented_image)))
        enclosed_image = closing(segmented_image)
        enclosed_image = opening(invert_bitwise(enclosed_image))
        segmented_color = and_bitwise(blurred_image, enclosed_image)

        # cv2.imshow(f'Processed {i + 1}', processed_img)
        # cv2.imshow(f'Blurred {i + 1}', blurred_image)
        # cv2.imshow(f'Segmented {i + 1}', segmented_image)
        # cv2.imshow(f'Segmented chan vese {i + 1}', segmented_image2)
        # cv2.imshow(f'Enclosed {i + 1}', enclosed_image)
        cv2.imshow(f'Segmented lession {i + 1}', segmented_color)
        cv2.imshow(f'Original {i + 1}', img)

        mssimv = get_mssism(img, blurred_image)
        print(f"MSSISM: R {round(mssimv[2] * 100, 2)}% G {round(mssimv[1] * 100, 2)}% B "
              + f"{round(mssimv[0] * 100, 2)}%")

    cv2.waitKey(0)


    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
