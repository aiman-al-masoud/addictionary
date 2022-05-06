import React, { Component } from "react";
import reactDOM from "react-dom";
import Dictionary from "./Dictionary.jsx";
import Translate from "./Translate.jsx";
import Styles from "./Styles"


class AppModes {
    static TRANSLATE = "TRANSLATE"
    static DICTIONARY = "DICTIONARY"
}

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mode: AppModes.TRANSLATE
        }
    }

    render() {


        return (<div >

            <button onClick={()=>{this.setState({ mode: AppModes.TRANSLATE })}}>Translate</button>
            <button onClick={()=>{this.setState({ mode: AppModes.DICTIONARY })}}>Dictionary</button>

            <div style={this.state.mode == AppModes.TRANSLATE ? Styles.visible : Styles.invisible}>
                <Translate />
            </div>

            <div style={this.state.mode == AppModes.DICTIONARY ? Styles.visible : Styles.invisible}>
                <Dictionary />
            </div>

        </div>)
    }


}


