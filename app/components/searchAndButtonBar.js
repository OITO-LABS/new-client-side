import React, { Component } from 'react';
import { FLIP_LOADER } from "utils/constants";
import PropTypes from 'prop-types';
// import {SHOW_ALERT} from "../../utils/constants";
import "assets/css/searchAndButtonBar.css"

class SearchAndButtonBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeSearchValue: ""
        }
        this.employeeSearchHandler = this.employeeSearchHandler.bind(this);
        this.exportHandler = this.exportHandler.bind(this);
    }

    exportHandler() {
        alert("second button clicked");
    }
    
    employeeSearchHandler(e) {
        let searchValue = e.target.value;
        this.setState({
            employeeSearchValue: searchValue
        },()=>this.props.searchHandler(searchValue))
    }

    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row header-bar">
                    <button type="button" onClick={this.props.handleRegister} className="btn btn-primary button">{this.props.button1name}</button>
                    <button type="button" onClick={this.exportHandler} className="btn btn-success button">{this.props.button2name}</button>
                    <div className="form-group has-search ml-auto">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" onChange={this.employeeSearchHandler} className="form-control search-box" placeholder="Search..." value={this.state.employeeSearchValue} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchAndButtonBar;

SearchAndButtonBar.propTypes = {
    button1name: PropTypes.string,
    button2name: PropTypes.string,
    searchHandler:PropTypes.func.isRequired
};

SearchAndButtonBar.defaultProps = {
    button1name: "add",
    button2name: "export"
};
