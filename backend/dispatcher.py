from adapters.blob_storage import download_image
import sys
import image_processing.processor as img_proc
import json


def verify_image_content(img, id):
    if 'error' in img:
        result = {
                'error': f'Error with img: {id} {img["error"]} ',
        }
        print(json.dumps(result), file=sys.stderr)
        exit(-1)

def compare(id1, id2):
    result1 = extract(id1)
    result2 = extract(id2)

    result = {
            'result1': result1,
            'result2': result2,
    };

    return json.dumps(result)


def classify(id):
    img = download_image(id)
    verify_image_content(img, id)

    result = {
        'percentage' : 85.3,
    };

    return json.dumps(result)

def extract(id):
    img = download_image(id)
    verify_image_content(img, id)

    result = img_proc.extract(img['data'])

    return json.dumps(result)


def main():
    op = sys.argv[1]
    if op == 'compare':
        id1 = sys.argv[2]
        id2 = sys.argv[3]
        print(compare(id1, id2))
    elif op == 'classify':
        id1 = sys.argv[2]
        print(classify(id1))
    elif op == 'extract':
        id1 = sys.argv[2]
        print(extract(id1))
    else:
        result = {
                'error': 'bad request',
        }
        print(json.dumps(result), file=sys.stderr)

if __name__ == '__main__':
    main()
