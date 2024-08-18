from flask import Flask, request, send_file, jsonify
import os
from flask_cors import CORS
import subprocess
import requests
from PIL import Image
from io import BytesIO

app = Flask(__name__)
CORS(app)

def run_face_swap(target_path, source_path, output_path):
    command = f'python run.py --target "{target_path}" --source "{source_path}" -o "{output_path}" --frame-processor face_swapper'
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Face swap failed: {result.stderr}")

@app.route('/face_swap', methods=['POST'])
def upload():
    if 'target' not in request.form or 'source' not in request.files:
        return jsonify({'error': 'Target URL or source image not found'}), 400
    
    target_url = request.form['target']
    source = request.files['source']

    try:
        # Download the target image
        response = requests.get(target_url)
        response.raise_for_status()
        target_image = Image.open(BytesIO(response.content))

        # Save the target image
        target_path = 'target.jpg'
        target_image.save(target_path)

        # Save the source image
        source_path = 'source.jpg'
        source.save(source_path)

        output_path = 'output.jpg'

        run_face_swap(target_path, source_path, output_path)

        return send_file(output_path, mimetype='image/jpeg')
    except requests.RequestException as e:
        return jsonify({'error': f'Failed to download target image: {str(e)}'}), 500
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Face swap failed: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
