import React, { Component } from 'react';
import "assets/sass/components/_noRecordsFound.scss";

export class NoRecordsFound extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div  class=" no-records">
                <h1 className="text-center">No Records Found</h1>
            </div>
        );
    }
}

export default NoRecordsFound;
