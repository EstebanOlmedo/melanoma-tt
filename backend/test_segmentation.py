import sys

import cv2
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

from image_processing.util import noise_removal

def show_channels_img(img):
    # Extract RGB channels
    red_channel = img[:, :, 0]
    green_channel = img[:, :, 1]
    blue_channel = img[:, :, 2]

    # Create subplots for each channel
    _, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(15, 5))

    # Plot the Red channel
    ax1.set_title('Red Channel')
    ax1.imshow(red_channel, cmap='Reds')

    # Plot the Green channel
    ax2.set_title('Green Channel')
    ax2.imshow(green_channel, cmap='Greens')

    # Plot the Blue channel
    ax3.set_title('Blue Channel')
    ax3.imshow(blue_channel, cmap='Blues')

    # Show the plots
    plt.show()

def plot_grayscale_graph(img):
    flattened_array = img.flatten()
    x = np.arange(256)
    y = [0] * 256

    for val in flattened_array:
        y[val] += 1

    sns.set_theme(style='whitegrid', font_scale=2)
    plt.figure(figsize=(10, 10))

    sns.histplot(x=flattened_array, bins=256, color='green')
    sns.lineplot(x=x, y=y, color='red')

    plt.xlabel('Valor de intensidad')
    plt.ylabel('Frecuencia en la imagen')
    plt.show()

def plot_grayscale_threshold(img, threshold):
    flattened_array = img.flatten()
    x = np.arange(256)
    y = [0] * 256

    for val in flattened_array:
        y[val] += 1

    sns.set_theme(style='whitegrid', font_scale=2)
    plt.figure(figsize=(10, 10))

    sns.histplot(x=flattened_array, bins=256, color='lightblue')
    sns.lineplot(x=x, y=y, color='red')

    plt.fill_between(x, 0, y, where=(np.array(x) <= threshold),
                     interpolate=True, color='yellow', alpha=0.5)
    plt.fill_between(x, 0, y, where=(np.array(x) >= threshold), interpolate=True, color='red', alpha=0.5)

    plt.xlabel('Valor de intensidad')
    plt.ylabel('Frecuencia en la imagen')
    plt.show()

def plot_grayscale_img(img):
    plt.imshow(img, cmap='gray')
    plt.show()

def main():
    if len(sys.argv) != 2:
        print('usage: python3 test_segmentation.py <image_path>')
        exit()

    image_path = sys.argv[1]
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (300, 300))

    img, _ = noise_removal.dull_razor(img)
    val, _ = noise_removal.otsu_method(img)
    grayscale2 = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    print(f"Threshold: {val}")
    plot_grayscale_graph(grayscale2)
    plot_grayscale_threshold(grayscale2, val)
    plot_grayscale_img(grayscale2)


if __name__ == '__main__':
    main()
