import json
import logging
import os

import numpy as np
import torch
from torch import Tensor, nn
from segment_anything import SamPredictor, sam_model_registry

from ..image_processing.util.converter import convertToOpenCVFormat

model = None
device = None


def predict(trained_model: nn.Module, x: Tensor) -> torch.Tensor:
    with torch.no_grad():
        y_prime = trained_model(x)
        probabilities = nn.functional.softmax(y_prime, dim=1)
        predicted_indices = probabilities.argmax(1)
    return predicted_indices


def init():
    logging.info('Init started')

    global model
    global device

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    logging.info('Device: %s', device)

    model_path = os.path.join(os.getenv('AZUREML_MODEL_DIR'), 'sam_vit_h_4b8939.pth')

    model = sam_model_registry['vit_h'](checkpoint=model_path)

    logging.info('Init completed')


def run(raw_data):
    logging.info('Run started')
    request = json.loads(raw_data)
    return request
