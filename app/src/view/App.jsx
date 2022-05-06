import React, { Component } from "react";
import reactDOM from "react-dom";
import Dictionary from "./Dictionary.jsx";
import Translate from "./Translate.jsx";
import Styles from "./Styles"
import { setFavicon, setTitle } from "../model/Utils.js";
import DictionaryPicture from "../../res/dictionary.png"
import TranslationPicture from "../../res/translation.png"



class AppModes {
    static TRANSLATE = "Translate"
    static DICTIONARY = "Dictionary"
}

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mode : undefined
        }
    }

    componentDidMount(){
        this.setMode(AppModes.TRANSLATE)
    }

    setMode = (newMode)=>{
        this.setState({mode :newMode})
        setTitle(newMode)
        this.faviconDict = {}
        this.faviconDict[AppModes.TRANSLATE] = TranslationPicture
        this.faviconDict[AppModes.DICTIONARY] = DictionaryPicture
        setFavicon(this.faviconDict[newMode])
    }

    render() {


        return (<div >


            <img onClick={()=>{this.setMode(AppModes.TRANSLATE)}} src={TranslationPicture} className="translate_icon" title="Translator"  alt="Translator"/>
            <img onClick={()=>{this.setMode(AppModes.DICTIONARY)}} src={DictionaryPicture} className="dictionary_icon" title="Dictionary"  alt="Dictionary"/>

            <div style={this.state.mode == AppModes.TRANSLATE ? Styles.visible : Styles.invisible}>
                <Translate />
            </div>

            <div style={this.state.mode == AppModes.DICTIONARY ? Styles.visible : Styles.invisible}>
                <Dictionary />
            </div>

        </div>)
    }


}


