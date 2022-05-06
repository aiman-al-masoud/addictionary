from flask import Flask, render_template, request, send_file
import os
# import pandas as pd
# from time import time
# import subprocess
# import random
# import re

import json
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

DICTS_PATH = os.path.join(app.root_path,  "res")


with open(os.path.join(DICTS_PATH, "dictionary.json")) as f:
    d = json.loads(f.read())

@app.route("/")
def on_index():
    path = os.path.join(app.root_path, "..", "dist", "index.html")
    with open(path) as f:
        source = f.read()
    return source


@app.route("/post-word", methods=["GET", "POST"])
def post_word():
    print(request.json)
    d[request.json["entry"][0]] = request.json["entry"][1]
    
    with open(os.path.join(app.root_path,  "res", "dictionary.json"), "w+") as f:
        f.write(json.dumps(d))

    return "success", 200

@app.route("/get-dictionary", methods=["GET"])
def get_dictionary():
    return json.dumps(d)


@app.route("/get-dictionaries-list", methods=["GET"])
def get_dictionaries_list():
    return json.dumps(os.listdir(DICTS_PATH))



