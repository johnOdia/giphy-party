import { Component } from 'react';

export class Giphy extends Component{
    render(){
        return(
            <iframe style={{borderRadius:'15px'}} src={this.props.src} alt={this.props.alt} width="300" height="200" frameBorder="0"  ></iframe>
        )
    }
}