import React, {Component} from "react";
import reactDOM from "react-dom";
import Dictionary from "./Dictionary.jsx";
import Translate from "./Translate.jsx";


export default class App extends Component{

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){

        
        
        return (<div>

            <Translate/>

            <br />
            <br />
            <br />
            <Dictionary/>
            

        </div>)
    }
    
}
