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


# with open(os.path.join(DICTS_PATH, "dictionary.json")) as f:
#     d = json.loads(f.read())


def list_dictionaries():
    return os.listdir(DICTS_PATH)


dict_of_dicts = { d : json.loads(open(os.path.join(DICTS_PATH, d), "r").read())  for d in list_dictionaries()}

print(dict_of_dicts)


@app.route("/")
def on_index():
    path = os.path.join(app.root_path, "..", "dist", "index.html")
    with open(path) as f:
        source = f.read()
    return source


@app.route("/post-word", methods=["GET", "POST"])
def post_word():
    # print(request.json)
    d[request.json["entry"][0]] = request.json["entry"][1]
    
    with open(os.path.join(app.root_path,  "res", "dictionary.json"), "w+") as f:
        f.write(json.dumps(d))

    return "success", 200

@app.route("/get-dictionary", methods=["GET"])
def get_dictionary():
    
    try:
        dict_name = request.json["dict_name"] 
    except:
        dict_name = "dictionary.json"

    print("HERE", dict_of_dicts)

    return json.dumps(dict_of_dicts[dict_name])


@app.route("/get-dictionaries-list", methods=["GET"])
def get_dictionaries_list():
    return json.dumps(list_dictionaries())



