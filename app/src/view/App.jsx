import React, { Component } from "react";
import reactDOM from "react-dom";
import Dictionary from "./Dictionary.jsx";
import Translate from "./Translate.jsx";
import Styles from "./Styles"
import { setTitle } from "../model/Utils.js";


class AppModes {
    static TRANSLATE = "Translate"
    static DICTIONARY = "Dictionary"
}

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mode: AppModes.TRANSLATE
        }
    }

    setMode = (newMode)=>{
        this.setState({mode :newMode})
        setTitle(newMode)
    }

    render() {


        return (<div >

            <button onClick={()=>{this.setMode(AppModes.TRANSLATE)}}>Translate</button>
            <button onClick={()=>{this.setMode(AppModes.DICTIONARY)}}>Dictionary</button>

            <div style={this.state.mode == AppModes.TRANSLATE ? Styles.visible : Styles.invisible}>
                <Translate />
            </div>

            <div style={this.state.mode == AppModes.DICTIONARY ? Styles.visible : Styles.invisible}>
                <Dictionary />
            </div>

        </div>)
    }


}


