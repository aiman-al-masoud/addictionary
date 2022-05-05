import React, {Component} from "react";
import reactDOM from "react-dom";
import Server from "../model/Server";


export default class App extends Component{

    constructor(props){
        super(props)
    }

    render(){

        Server.get().postWord("capra", "cavallo").then(()=>{
            let d = Server.get().getDictionary().then(p=>console.log(p))
            }
        )

        return <h1>Hello world!</h1>
    }
    
}
