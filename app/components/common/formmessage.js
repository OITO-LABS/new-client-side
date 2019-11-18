import React from "react";
import {translate} from 'utils/common';

class FormMsg extends React.PureComponent{
    render(){
        if(!this.props.error && !this.props.msg) return null;
        let error = (this.props.type || 'error') == 'error';
        return(
            <div className={(this.props.htmFor?"":error?"is-invalid ":"is-valid ")+(error?"invalid-feedback":"valid-feedback")+(' '+this.props.className)} dangerouslySetInnerHTML={{ __html:translate(this.props.msg || this.props.error)}}/>
        );
    }
}

export default FormMsg;