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
IS_KILLED = False

# with open(os.path.join(DICTS_PATH, "dictionary.json")) as f:
#     d = json.loads(f.read())


def list_dictionaries():
    return [ d.strip(".json") for d in os.listdir(DICTS_PATH) ]


dict_of_dicts = { d : json.loads(open(os.path.join(DICTS_PATH, f"{d}.json"), "r").read())  for d in list_dictionaries()}

# print(dict_of_dicts)


@app.route("/")
def on_index():
    path = os.path.join(app.root_path, "..", "dist", "index.html")
    with open(path) as f:
        source = f.read()
    return source


@app.route("/post-word", methods=["GET", "POST"])
def post_word():

    dict_of_dicts[request.json["dict_name"]] [request.json["entry"][0]] = request.json["entry"][1]

    with open(os.path.join(DICTS_PATH, request.json["dict_name"] ), "w+") as f:
        f.write(json.dumps(dict_of_dicts[request.json["dict_name"]]))

    return "success", 200

@app.route("/get-dictionary", methods=["GET", "POST"])
def get_dictionary():
    
    try:
        dict_name = request.json["dict_name"] 
    except:
        dict_name = "dictionary.json"


    return json.dumps(dict_of_dicts[dict_name])


@app.route("/get-dictionaries-list", methods=["GET"])
def get_dictionaries_list():
    return json.dumps(list_dictionaries())

@app.route("/create-dictionary", methods=["GET", "POST"])
def create_dictionary():

    try:
        dict_name = request.json["dict_name"]
        d = request.json["dict"]

        path = os.path.join(DICTS_PATH, f"{dict_name}.json")
        if os.path.isfile(path):
            return "name already taken", 400
            
        with open(path, "w+") as f:
            f.write(json.dumps(d))
        
        return "success"

    except:
        return "failure", 400
    



# @app.route("/kill", methods=["GET", "POST"])
@app.route("/kill", methods=["GET"])
def kill():
    
    global dict_of_dicts, IS_KILLED
    
    # print(request.json)
    # password = request.json["password"]
    # if password == "password":
        # dict_of_dicts = {}
    
    dict_of_dicts = {}
    IS_KILLED = True

    return "success"


@app.route("/is-killed", methods=["GET"])
def is_killed():
    return json.dumps({ "killed": IS_KILLED })
