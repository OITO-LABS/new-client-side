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
            <div class="row heading-row">
                <h4 class="text-uppercase">{this.props.heading}</h4>
            </div>
        );
    }
}

export default Heading;
