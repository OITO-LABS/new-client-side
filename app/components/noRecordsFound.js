import React, { Component } from 'react';

export class NoRecordsFound extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h5 className="text-center">No Records Found</h5>
            </div>
        );
    }
}

export default NoRecordsFound;
