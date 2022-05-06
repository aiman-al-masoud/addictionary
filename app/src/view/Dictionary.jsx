import React, { Component } from "react";
import reactDOM from "react-dom";
import Server from "../model/Server";
import { saveToComp } from "../model/Utils";
import S from "../model/Settings";

export default class Dictionary extends Component {

    constructor(props) {
        super(props)
        this.wordInput = React.createRef()
        this.meaningInput =  React.createRef(),

        this.state = {
            availableDicts : [],
            selectedDict : S.get().get(S.DICTIONARY_NAME)
        }
    }

    onAddEntry = async ()=>{
        await Server.get().postWord(this.wordInput.current.value, this.meaningInput.current.value)
        this.wordInput.current.value = ""
        this.meaningInput.current.value = ""
        location.reload()
    }

    onDownloadDictionary = async ()=>{
        saveToComp(JSON.stringify(await Server.get().getDictionary()), "pointless-waste-of-time.json", "text/plain")
    }

    componentDidMount(){

        this.setState({selectedDict : S.get().get(S.DICTIONARY_NAME)})

        Server.get().getAvailableDicts().then((li)=>{
            console.log(li)
            this.setState({availableDicts : li})
        })
    }

    onSetDictionary = (event)=>{

        let choice = event.target
        choice = choice.options[choice.selectedIndex].text
        S.get().set(S.DICTIONARY_NAME, choice)
        this.setState({selectedDict: choice})
        location.reload()
    }

    render(){
        return (<div>

            <h1>Dictionary</h1>

            <h2>Select Dictionary</h2>

            <select value={this.state.selectedDict} onChange={this.onSetDictionary} >
                {this.state.availableDicts.map(  dname => <option value={dname} key={dname}>{dname}</option> )}
            </select>

            <h2>Enrich Dictionary "{this.state.selectedDict}"</h2>
            <p>New entry:</p>
            <input  ref={this.wordInput} type="text" className="text_field"  />
            <p>Meaning:</p>
            <input ref={this.meaningInput} type="text" className="text_field" />
            <br />
            <br />
            <button onClick={this.onAddEntry}>Add Entry</button>

            <h2>Downloads</h2>
            <button onClick={this.onDownloadDictionary}>Download Dictionary</button>

        </div>)
    }


}