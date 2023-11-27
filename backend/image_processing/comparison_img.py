from image_processing.util.colors import COLOR_SCORE_PERCENTAGES
from image_processing.feature_extraction import center, get_color_score_freqs, get_major_axis, get_simetry_images
from .processor import process_image
import numpy as np
import cv2
from .util.image import TEST_IMAGES


def get_color_score_pallet(processed_img, msk):
    rows = 800
    cols = 800
    img = np.zeros([rows, cols, 3])
    colors = get_color_score_freqs(processed_img, msk)
    total_freq = sum(colors.values())
    lst_width = 0
    for color, cnt in colors.items():
        width = lst_width + int(cnt / total_freq * cols)
        r, g, b = COLOR_SCORE_PERCENTAGES[color]
        img[:,lst_width:width,2] = np.ones([rows, width - lst_width]) * r
        img[:,lst_width:width,1] = np.ones([rows, width - lst_width]) * g
        img[:,lst_width:width,0] = np.ones([rows, width - lst_width]) * b
        lst_width = width
    return img

def get_symetry_img(msk):
    hor, vert = get_simetry_images(msk)
    images = [hor, vert]
    symetries = cv2.vconcat(images)
    return symetries

def get_contour_img(color_img, msk, color=(0,255,0)):
    msk, color_img = center(msk, color_img)
    contours, _hierarchy = cv2.findContours(msk, 1, 2)
    contour_img = color_img.copy() * 0
    cv2.drawContours(contour_img, contours, -1, color, 2)
    return contour_img

def add_imgs(img1, img2, alpha=0.5):
    beta = 1 - alpha
    dst = cv2.addWeighted(img1, alpha, img2, beta, 0)
    return dst

def main():
    image_metadata = TEST_IMAGES[1]

    img = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    [processed_img, msk] = process_image(img)

    img1 = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    image_metadata = TEST_IMAGES[2]
    img2 = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    [processed_img1, msk1] = process_image(img1)
    [processed_img2, msk2] = process_image(img2)

    msk, processed_img = center(msk, processed_img)
    pallete = get_color_score_pallet(processed_img, msk)
    contour1 = get_contour_img(processed_img1, msk1)
    contour2 = get_contour_img(processed_img2, msk2, (255,0,0))
    dst = add_imgs(contour1, contour2)
    # print(img)

    cv2.imshow('1', contour1)
    cv2.imshow('2', contour2)
    cv2.imshow('join', dst)
    # cv2.imshow('Org', img)
    cv2.imshow('Processed', processed_img)
    cv2.imshow('Mask', msk)
    cv2.imshow('Pallete', pallete)
    # cv2.imshow('Symetry horizontal', hor)
    # cv2.imshow('Symetry vertical', vert)
    # cv2.imshow('Symetry', symetries)
    # cv2.imshow('Ellipse', img_ellipse)
    cv2.waitKey(0)

if __name__ == '__main__':
    main()
