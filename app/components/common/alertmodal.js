import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {ALERT_TYPE,SHOW_ALERT} from 'utils/constants';
import {translate} from 'utils/common';
const defaultProps = {
    type:ALERT_TYPE.ALERT,
    title:'app.welcome',
    msg:'app.success',
    modelClass:'modal-dialog modal-confirm modal-sm'
}
const customProps = {
    [ALERT_TYPE.ALERT]:{
        header:{
            className:'icon-box success-color',
            iconClass:'icon-gift'
        },
        buttons:{
            ok:{disabled:false,label:'app.lbl.ok',className:'btn btn-xl btn-primary'},
            cancel:{disabled:true,label:'app.button.cancel',className:'btn btn-border btn-xl'}
        }
    },
    [ALERT_TYPE.CONFIRM]:{
        header:{hidden:true},
        buttons:{
            ok:{disabled:false,label:'app.lbl.ok',className:'btn btn-xl btn-primary'},
            cancel:{disabled:false,label:'app.button.cancel',className:'btn btn-border btn-xl'}
        }
    }
}
class AlertModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal:false, ...defaultProps,...customProps[ALERT_TYPE.ALERT],isSignup:false};
        this.showDialog = this.showDialog.bind(this);
        this.ok = this.ok.bind(this);
        this.cancel = this.cancel.bind(this);
        let evt = {};
        evt[SHOW_ALERT] = this.showDialog;
        app.events.subscribe(evt, this,-1);
    }
    showDialog([data]){
        this.callBack = data.callBack || null;
        delete data.callBack;
        data.type = data.type || ALERT_TYPE.ALERT;
        data = {...(customProps[data.type] || customProps[ALERT_TYPE.ALERT]),...data};
        data.header = {...(customProps[data.type] || {}).header,...(data.header||{})};
        data.buttons = {...(customProps[data.type] || {}).buttons,...(data.buttons||{})};
        data.buttons.ok = {...(customProps[data.type] || {}).buttons.ok,...(data.buttons.ok||{})};
        data.buttons.cancel = {...(customProps[data.type] || {}).buttons.cancel,...(data.buttons.cancel||{})};
        data.msg = data.msg || data.message;
        this.setState({showModal:true,...defaultProps,...data});
    }
    ok(){
        this.setState({showModal:false});
        this.callBack && this.callBack(true);
    }
    cancel(){
        this.setState({showModal:false});
        this.callBack && this.callBack(false);
    }
    render() {
        return (
                <Modal isOpen={this.state.showModal} className={this.state.modelClass}>
                     {this.state.header && !this.state.header.hidden && <div className="modal-header">
                        {this.state.header.iconClass && <div className={this.state.header.className}><i className={this.state.header.iconClass}></i></div>}
                        {/* this.state.type == ALERT_TYPE.CONFIRM && <div className="icon-box error-color"><i className="fas fa-times"></i></div> */}
                        <h3 className="modal-title">{translate(this.state.title)}</h3>
                        {!this.state.hideModalCloseBtn && <button type="button" onClick={this.cancel} className="close" data-dismiss="modal" aria-hidden="true">×</button>}
                    </div>}
                    <ModalBody>
                        <p className="text-center" dangerouslySetInnerHTML={{ __html:translate(this.state.msg)}}/>
                    </ModalBody>
                    <div className="modal-footer text-center button-center">
                        {/*this.state.type == ALERT_TYPE.ALERT && <button onClick={this.ok} className={this.state.buttons.ok.className}>{translate(this.state.buttons.ok.label)}</button>*/}
                        <React.Fragment>
                            {!this.state.buttons.cancel.disabled && <button onClick={this.cancel} className={this.state.buttons.cancel.className}>{translate(this.state.buttons.cancel.label)}</button>}                            
                            {!this.state.buttons.ok.disabled && <button onClick={this.ok} className={this.state.buttons.ok.className}>{translate(this.state.buttons.ok.label)}</button>}
                            
                        </React.Fragment>
                    </div>
                </Modal>
        )
    }
}
export default AlertModal;