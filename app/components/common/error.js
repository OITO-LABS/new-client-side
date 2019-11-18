import React from "react";
import {translate} from 'utils/common';

class FormMsg extends React.PureComponent{
    render(){
        if(!this.props.error && !this.props.msg) return null;
        let error = (this.props.type || 'error') == 'error';
        return(
            <div className={(this.props.for?"":error?"is-invalid ":"is-valid ")+(error?"invalid-feedback":"valid-feedback")}>{translate(this.props.msg || this.props.error)}</div>
        );
    }
}

export default FormMsg;