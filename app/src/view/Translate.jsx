import React, { Component } from "react";
import reactDOM from "react-dom";
import Server from "../model/Server";
import Translator from "../model/Translator";

export default class Translate extends Component {

    constructor(props) {
        super(props)

        this.textarea = React.createRef()

        this.state = {
            translator: new Translator({}), 
            plainEnglishInput : "",
            idiosyncraticOutput : ""
        }
        

        Server.get().getDictionary().then((d) => {
            this.setState({ translator: new Translator(d) })
        })

    }

    onEnterPlainEnglishInput = (string)=>{
        this.setState({plainEnglishInput: string})
        console.log(this.state.plainEnglishInput)
        let translation = this.state.translator.translate(this.state.plainEnglishInput)
        this.setState({idiosyncraticOutput: translation})
    }


    render() {

        return (<div>

            <h2>Plain English:</h2>
            <textarea ref={this.textarea}  onInput={()=>{this.onEnterPlainEnglishInput(this.textarea.current.value)}}  value={this.state.plainEnglishInput}></textarea>
            
            <h2>Makessensese:</h2>
            <pre>{this.state.idiosyncraticOutput}</pre>

        </div>)
    }
}
