import { Component } from "react";
import './styles.css';

export class Input extends Component{
    render(){
        const {onChange, type, value} = this.props;
        return(
            <input className="text-input" type={type} onChange={onChange} value={value} placeholder="Type your search"></input>
        )
    }

}