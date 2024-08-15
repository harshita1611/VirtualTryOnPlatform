from flask import Flask, request, jsonify, send_file
import os
import cv2
import numpy as np
import PIL as Image
import onnxruntime as ort

app=Flask(__name__)

MODEL_PATH='/Users/harshita/Desktop/walmart/roop/inswapper_128.onnx'

def run_face_swap(target_path,source_path,output_path):
    command = f'python run.py --target {target_path} --source {source_path} -o {output_path} --frame-processor face_swapper'
    os.system(command)
    

@app.route('/face_swap',methods=['POST'])

def upload():
    if 'target' not in request.files or 'source' not in request.files:
        return jsonify({'error':'target/source image not found'})
    
    target=request.files['target']
    source=request.files['source']
    
    target_path='target.jpg'
    source_path='source.jpg'
    output_path='output.jpg'
    
    target.save(target_path)
    source.save(source_path)
    
    run_face_swap(target_path, source_path, output_path)
    return send_file(output_path, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)