import React, { Component } from 'react';
import { FLIP_LOADER } from "utils/constants";
import PropTypes from 'prop-types';
import "assets/css/dateAndButtonBar.css"

class DateAndButtonBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fromDate:"",
            toDate:""
        }
        this.dateHandler = this.dateHandler.bind(this);
        this.exportHandler = this.exportHandler.bind(this);
    }

    exportHandler() {
        alert("second button clicked");
    }

    dateHandler(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]:value
        }, () => this.props.dateHandler(this.state.fromDate,this.state.toDate))
    }

    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row header-bar">
                    <button type="button" onClick={this.props.handleRegister} className="btn btn-primary button">{this.props.button1name}</button>
                    {/* <button type="button" onClick={this.exportHandler} className="btn btn-success button">{this.props.button2name}</button> */}
                    
                    <div className="form-group has-search ml-auto date-bar">
                    From-Date:<input type="date" id="start" onChange={this.dateHandler} name="fromDate" className="search-box date" />
                    To-Date:<input type="date" id="start" onChange={this.dateHandler} name="toDate" className="search-box date" />
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default DateAndButtonBar;

DateAndButtonBar.propTypes = {
    button1name: PropTypes.string,
    // button2name: PropTypes.string,
    // dateHandler:PropTypes.func.isRequired
};

DateAndButtonBar.defaultProps = {
    button1name: "add",
    // button2name: "export"
};
