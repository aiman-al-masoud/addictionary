from flask import Flask, render_template, request, send_file
import re
import os
import pandas as pd
from time import time
import subprocess
import random

import json
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


d = {"colam" : "column", "makessense" : "\n"}

@app.route("/")
def on_index():
    path = os.path.join(app.root_path, "..", "dist", "index.html")
    with open(path) as f:
        source = f.read()
    return source


@app.route("/post-word", methods=["GET", "POST"])
def post_word():
    print(request.json)
    return "success", 200

@app.route("/get-dictionary", methods=["GET"])
def get_dictionary():
    return json.dumps(d)






