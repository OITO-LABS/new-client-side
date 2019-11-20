import React, { Component } from 'react';
import "assets/css/heading.css";


export class Heading extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="row heading-row">
                <h4 >{this.props.heading}</h4>
            </div>
        );
    }
}

export default Heading;
