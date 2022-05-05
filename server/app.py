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

print(app.root_path)


@app.route("/")
def on_index():
    path = os.path.join(app.root_path, "..", "dist", "index.html")
    with open(path) as f:
        source = f.read()
    return source