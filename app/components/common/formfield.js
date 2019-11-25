import React from 'react';
import {translate} from 'utils/common';
import {Input,NumberField,PhoneField,Select} from './inputfields';
import { Popover, PopoverBody } from 'reactstrap';
import "assets/sass/pages/_employeeRegister.scss"

class InfoIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {popoverOpen:false};
        this.showPopover = this.showPopover.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
    }

    showPopover(){
        this.setState({popoverOpen:true});
    }
    hidePopover(){
        this.setState({popoverOpen:false});
    }
    render(){
        return (
                <React.Fragment>
                    <i id="guestCheckoutIcon"  onMouseLeave={this.hidePopover} onClick={this.showPopover} className="fas fa-info-circle cu-pointer" />
                    <Popover placement="right" isOpen={this.state.popoverOpen} target="guestCheckoutIcon">
                        <PopoverBody>{translate(this.props.infoMsg)}</PopoverBody>
                    </Popover>
                </React.Fragment>
            );
    }
}
class FormField extends React.PureComponent{
    getComp(id){
        let p = {...this.props,id:id};
        switch(this.props.type)
        {
            case 'number' : return <NumberField {...p} />
            case 'phone' : return <PhoneField {...p} />
            case 'select' : return <Select {...p} />
            default : return <Input {...p} />
        }
    }
    renderLabel(id,opt={})
    {
        const props = this.props;  
        return <label title={opt.text || props.title || ''} htmlFor={id} className={opt.className || props.labelClassName}>{translate(opt.text || props.label)}
            {!opt.subTitle && this.props.mandatory && <small className="mandatory">*</small>}
        </label>
    }
    render(){
        const props = this.props;  
        const id = props.id || (props.name+new Date().getTime());   
        const comp = this.getComp(id);
        return(
            <div className={props.hidden ? 'd-none' : props.className || "form-group"}>
                {props.label && !props.labelPostField && this.renderLabel(id)}
                {comp}
                {props.label && props.labelPostField && this.renderLabel(id) }
                {props.subTitle && this.renderLabel(id,{...props.subTitle,subTitle:true}) }
                {props.infoMsg && <InfoIcon infoMsg={props.infoMsg}/>}
            </div>
      )
    }
}
export default FormField;


