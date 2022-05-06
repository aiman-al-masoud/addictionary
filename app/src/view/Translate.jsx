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

    onSpeak = ()=>{
        let speech = new SpeechSynthesisUtterance();
        speech.lang ="en"
        speech.text = this.state.idiosyncraticOutput
        window.speechSynthesis.speak(speech)
    }


    render() {

        return (<div>

            <h1>Translator</h1>

            <h2>Plain English:</h2>
            <em>Try typing in a sentence, like: "Ok, I found a solution to the problem: reduce the number of columns/features."</em>
            <textarea ref={this.textarea}  onInput={()=>{this.onEnterPlainEnglishInput(this.textarea.current.value)}}  value={this.state.plainEnglishInput} cols="100" rows="10"></textarea>
            
            <h2>Makessensese:</h2>
            <pre style={{ "white-space": "pre-wrap"}}>{this.state.idiosyncraticOutput}</pre>

            <button onClick={this.onSpeak}>Speak</button>

        </div>)
    }
}
