from flask import Flask, request, render_template_string, send_from_directory
import os
import subprocess
import base64
app = Flask(__name__)

# Set the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'

# The allowed file extensions
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'php'}

# Check if a file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Home page
@app.route('/')
def index():
    return render_template_string('''
<!DOCTYPE html>
<html>
<head>
    <title>File Upload Challenge</title>
</head>
<body>
    <h1>File Upload Challenge</h1>
    <p>Upload an image file</p>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="file" accept="image/*">
        <br><br>
        <input type="submit" value="Upload & Display">
    </form>
''')

# File upload route


@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print(filename)
        if 'php' in filename:
            print("zzz")
            result = execute_file(filename)
        else:
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'rb') as f:
                image_data = f.read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            result = f'<img src="data:image/png;base64,{encoded_image}" alt="Uploaded Image">'
        return render_template_string(f'<h1>File Executed Successfully!</h1>{result}')
    else:
        return render_template_string('<h1>Invalid File!</h1>')


# Execute uploaded PHP file with parameters
def execute_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    command = f"php {file_path}"
    result = subprocess.check_output(command, shell=True, text=True)
    return result

if __name__ == '__main__':
    app.run(debug=True)
