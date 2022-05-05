import React, { Component } from "react";
import reactDOM from "react-dom";
import Server from "../model/Server";
import { saveToComp } from "../model/Utils";

export default class Dictionary extends Component {

    constructor(props) {
        super(props)
        this.wordInput = React.createRef()
        this.meaningInput =  React.createRef()
    }

    onAddEntry = async ()=>{
        await Server.get().postWord(this.wordInput.current.value, this.meaningInput.current.value)
        this.wordInput.current.value = ""
        this.meaningInput.current.value = ""
        location.reload()
    }

    onDownloadDictionary = async ()=>{
        saveToComp(JSON.stringify(await Server.get().getDictionary()), "pointless-waste-of-time.txt", "text/plain")
    }

    render(){
        return (<div>

            <h1>Enrich the Dictionary</h1>
            <input  ref={this.wordInput} type="text"  />
            <input ref={this.meaningInput} type="text" />
            <button onClick={this.onAddEntry}>Add Entry</button>

            <button onClick={this.onDownloadDictionary}>Download Dictionary</button>
        </div>)
    }


}