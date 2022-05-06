import React, { Component } from "react";
import reactDOM from "react-dom";
import Server from "../model/Server";
import Translator from "../model/Translator";
import LoudSpeakerPicture from "../../res/loud-speaker.png"
import Styles from "./Styles";


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
            <br />
            <br />
            <textarea ref={this.textarea}  onInput={()=>{this.onEnterPlainEnglishInput(this.textarea.current.value)}}  value={this.state.plainEnglishInput} cols="100" rows="10"></textarea>
            
            <br />
            <br />
            <h2 style={Styles.visibleInline}>Better English:</h2> 
            <img  src={LoudSpeakerPicture} onClick={this.onSpeak} title="Speak" alt="Speak"  className="loud_speaker_icon"/>
         
            <br />
            <br />
            <textarea  cols="100" rows="10" value={this.state.idiosyncraticOutput}></textarea>


        </div>)
    }
}
