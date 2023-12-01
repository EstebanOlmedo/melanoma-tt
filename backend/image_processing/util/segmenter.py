from segment_anything import SamPredictor, sam_model_registry
import os
import numpy as np

def segment(img):
    dire = os.path.dirname(os.path.abspath(__file__))
    filename = 'sam_vit_h_4b8939.pth'
    sam = sam_model_registry['vit_h'](checkpoint=os.path.join(dire, filename))
    # Uncomment this to use CUDA
    # sam.to(device="cuda")

    predictor = SamPredictor(sam)
    predictor.set_image(img)

    input_point = np.array([[100, 100]])
    input_label = np.array([1])
    return predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=True,
    )
