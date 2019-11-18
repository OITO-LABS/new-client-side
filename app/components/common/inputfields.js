import React from 'react';
import {translate,isValidRange,round,withDecimal} from 'utils/common';
import FormMsg from './formmessage';
import Validator from 'validator';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import "assets/css/_empReg.css";

function getField(props,validator)
{
    let fieldClassName = props.fieldClassName || 'form-control';
    let extraPops = props.extraPops || {};
    let p = {id: (props.id || (props.name+new Date().getTime())),
             name:(props.nameAlias || props.name),
             //onChange:props.onChange,
             disabled:!!props.disabled,
             value:(props.value!=undefined? props.value:''),
             className:(fieldClassName+" "+(validator.isInvalid && 'is-invalid')),
             placeholder:translate(props.placeholder || ''),
             ...extraPops
            }
    props.onChange && (p['onChange'] = props.onChange);
    props.onKeyPress && (p['onKeyPress'] = props.onKeyPress);
    props.onBlur && (p['onBlur'] = props.onBlur);
    props.onClick && (p['onClick'] = props.onClick);
    let type = props.type || 'text';
    switch(props.type)
    {
        case 'textarea': props.rows && (p['rows'] = props.rows);
                         return <textarea {...p}></textarea>                 
        case 'radio': 
        case 'checkbox': p['checked'] = !!props.checked;
        default: return <input type={type} {...p}/>
    }
}
export class Select extends React.Component{
    constructor(props)
    {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.id = this.props.id || ('select-'+this.props.name+'-'+new Date().getTime());
        this.setProps();
        this.state = {dropDownToggle:false};
        this.searchable = !!this.p.searchable;
        this.searchItemLimit = this.p.searchItemLimit? parseInt(this.p.searchItemLimit):10;
        this.searchText = '';
        //this.validValue = this.props.value || this.p.defaultValue;
    }
    setProps(){
        let extraPops = this.props.extraPops || {};
        let value = this.props.value || this.props.defaultValue || '';
        let itemCount = 0;
        this.options = {};
        this.items = [];
        this.props.options && this.props.options.forEach(opt => {
            opt.value = opt.value || opt.code;
            opt.key = opt.key || opt.value.trim().replace(/[^a-z0-9-]/gmi, "_");
            opt.label = opt.label || opt.value;
            this.options[opt.key] = opt;
            this.options[opt.value] = opt;
            if(this.searchable){
                let regex = new RegExp(this.searchText, "im");
                if((!this.searchText || regex.test(opt.label)) && itemCount<this.searchItemLimit)
                {
                    itemCount++;
                    this.items.push(opt);
                }
            }
            else{
                this.items.push(opt);
            }
        });
        this.p = {...this.props,type:'text',onChange:this.changeHandler,...extraPops,value,id:this.id};
    }
    onSearch(event)
    {
        this.searchText = event.target.value;
        if(this.searchText && this.props.onSearch){
            this.props.onSearch(event,this.searchText);
        }
        else{
            this.setState({searching:true});
        }
    }
    changeHandler(event)
    {
        let value = event.currentTarget.attributes.valuekey.value;
        this.p.value = value;
        this.setState({dropDownToggle:false});
        this.props.onChange && this.props.onChange(event,{field:this.props.name,value,id:this.id,...this.getItemInfo(value)});
    }
    getItemInfo(value){
        return (this.options[value] || {} );
    }
    toggleDropDown(){
        this.setState({dropDownToggle:!this.state.dropDownToggle});
    }
    render()
    {
        if(!this.props.options) return <div/>;
        this.setProps();
        const props = this.p;
        const validator = (this.props.validator && this.props.validator[props.name]) || {isInvalid:false}; 
        return(
            <React.Fragment>
            <Dropdown isOpen={this.state.dropDownToggle} toggle={this.toggleDropDown} className={"custom-select reactdrop w-auto "+(this.props.fieldClassName || '')+(validator.isInvalid?' is-invalid':'')}>
                <DropdownToggle tag="div" className="reactdrop-lbl pr-2 position-relative d-flex">
                    {props.preIcon && <i className={props.iconClassName}></i>}
                    <label className="m-0" title={translate(this.getItemInfo(props.value).label || this.props.defaultValue || '')} >{translate(this.getItemInfo(props.value).label || this.props.defaultValue || '')}</label>
                    {!props.preIcon && <i className={props.iconClassName || 'fas fa-sort sort-ico'}></i>}
                </DropdownToggle>
                <DropdownMenu tag="ul" className="w-100">
                    <React.Fragment>
                        {this.searchable && this.props.options.length > this.searchItemLimit && <li className="select-search-box">
                            <Input
                                name={this.props.name+"-search"}
                                placeholder="app.userorders.search"
                                onChange={this.onSearch}
                                value={this.searchText}
                            />
                        </li>}
                        {this.items.map((item, index) =>{
                            return <li className={"cu-pointer p-1 "+(props.value == item.value?'active':'')} key={item.key || item.value} valuekey={item.key || item.value} value={item.value} onClick={this.changeHandler}>
                                <label className="m-0">{translate(item["label"])}</label>
                                {props.itemIconConfig && props.itemIconConfig.active && props.value == item.value && <i className={props.itemIconConfig.className}/>}
                        </li>})
                        }
                    </React.Fragment>
                </DropdownMenu>
            </Dropdown>
            <FormMsg htmlFor={this.id} error={translate(validator.message ||'')}/>
            </React.Fragment>
        )
    }
}
export class PhoneField extends React.Component{
    constructor(props)
    {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.id = this.props.id || ('phone-'+this.props.name+'-'+new Date().getTime());
        this.setProps();
        this.state = {};
        this.valueChangable = !!this.props.onChange;
        this.countryCodes = app.phoneCountryCodes.map(c=>{return{value:c}});

        //this.validValue = this.props.value || this.p.defaultValue;
    }
    setProps(){
        let sendData = !this.updated && this.init && this.p.value!=this.props.value;
        let extraPops = this.props.extraPops || {};
        let value = this.props.value || this.props.defaultValue || '';
        let contryCode = app.phoneCountryCodes[0];
        if(value && value.startsWith('+')){
            contryCode = value.substring(0,3);
            value = value.substring(3);
        }
        this.p = {...this.props,contryCode,type:'text',onChange:this.changeHandler,...extraPops,value,id:this.id};
        sendData && this.sendData(null);
    }
    changeHandler(event,fieldInfo={})
    {
        this.updated = true;
        let value = event.target.value;
        if(fieldInfo.value){
            this.p.contryCode = fieldInfo.value.toString();
        }
        else if(value && Validator.isInt(value)){
            this.p.value = (value && value.charAt(0) == '0'?value.substring(1):value);
        }
        value = this.p.contryCode+this.p.value;
        this.sendData(event);
        //this.props.onChange && this.props.onChange(event,{field:this.p.name,value,contryCode:this.p.contryCode,phone:this.p.value,valid:this.valid()});
    }
    valid()
    {
        let valid = !Validator.isEmpty(this.p.value,{ignore_whitespace:true}) && Validator.isInt(this.p.value);
        if((this.p.minLength || this.p.maxLength) && valid){
            valid = Validator.isLength(this.p.value,{min:this.p.minLength || 0,max:this.p.maxLength});
        }
        return valid;
    }
    componentDidMount()
    {
        this.init = true;
        this.sendData(null,{init:true});
    }
    validPhone(){
        return this.p.contryCode+(this.p.value && this.p.value.charAt(0) == '0'?this.p.value.substring(1):this.p.value);
    }
    sendData(event,props={}){
        this.props.onChange && this.props.onChange(event,{...props,id:this.id,field:this.p.name,value:this.validPhone(),contryCode:this.p.contryCode,phone:this.p.value,valid:this.valid()});
    }
    componentDidUpdate()
    {
        //console.log(this.p.value +' -- '+this.props.value);
        /* if(!this.processing && this.valueChangable && this.p.value!=this.props.value)
        {
            this.setProps();
            this.setState({value:this.p.value});
        } */        
    }
    render(){
        this.setProps();
        const props = this.p;
        const validator = (this.props.validator && this.props.validator[props.name]) || {isInvalid:false};        
        return(
            <React.Fragment>
                <div className="phone-field d-flex">
                    {/* <select onChange={this.changeHandler} id={"country-"+this.id} value={props.contryCode} name={"country-"+props.name} className="pl-1 pr-1">
                        {app.phoneCountryCodes.map(c=><option key={c} value={c} >{c}</option>)}
                    </select> */}
                    <Select
                        options={this.countryCodes}
                        name={"country-"+props.name}
                        value={props.contryCode}
                        fieldClassName="reactdrop"
                        id={"country-"+this.id}
                        onChange={this.changeHandler}
                    />
                    {getField(props,validator)}                    
                </div>
                <FormMsg htmlFor={this.id} error={translate(validator.message ||'')}/>
            </React.Fragment>
            
      )
    }
}
export class QuantityBox extends React.Component{
    constructor(props)
    {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.id = this.props.id || ('quantity-'+this.props.name+'-'+new Date().getTime());
        this.setProps();
        this.state = {};
    }
    setProps(){
        let extraPops = this.props.extraPops || {};
        let value = this.props.value || this.props.defaultValue || '';
        this.p = {...this.props,type:'text',onChange:this.changeHandler,...extraPops,value,id:this.id};
    }
    changeHandler(event,fieldInfo={})
    {
        let action = fieldInfo.action || event.currentTarget.getAttribute('action');
        let value = fieldInfo.value || this.p.value;
        let bluring = false;
        if(action == '-')
        {
            value = parseInt(value) - 1;
            bluring = true;
        }
        else if(action == '+')
        {
            value = parseInt(value) + 1;
            bluring = true;
        }
        if(!this.valid(value)) return;
        
        this.p.value = value;
        this.props.onChange && this.props.onChange(event,{action,field:this.p.name,value,rawValue:value,id:this.id});
        bluring && this.props.onBlur && this.props.onBlur(event,{eventType:'blur',field:this.p.name,value:value,rawValue:value,id:this.id});
    }
    valid(value)
    {
        let valid = true;
        if(this.p.min !=undefined && value < parseInt(this.p.min)){
            valid = false;
        }
        if(this.p.max !=undefined && value > parseInt(this.p.max)){
            valid = false; 
        }
        return valid;
    }
    componentDidMount()
    {
        this.init = true;
    }
    componentDidUpdate()
    {
        //console.log(this.p.value +' -- '+this.props.value);
        /* if(!this.processing && this.valueChangable && this.p.value!=this.props.value)
        {
            this.setProps();
            this.setState({value:this.p.value});
        } */        
    }
    render(){
        this.setProps();
        const props = this.p;       
        return(
            <div className="form-group">
                <div className="calculator">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-number" action="-" onClick={this.changeHandler} disabled={this.props.value == this.p.min}>
                                <i className="fas fa-minus"></i>
                            </button>
                        </span>
                        <NumberField {...props}/>
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-number" action="+" onClick={this.changeHandler} disabled={this.props.value == this.p.max}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            
      )
    }
}

export class NumberField extends React.Component{
    constructor(props)
    {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.id = this.props.id || ('number-'+this.props.name+'-'+new Date().getTime());
        this.setProps();
        this.state = {};
        this.valueChangable = !!this.props.onChange;
        this.validValue = this.props.value || this.p.defaultValue;
        this.decimalPlace =  parseInt(this.p.decimalPlace || '0');
        this.maxDigit =  this.p.maxDigit?parseInt(this.p.maxDigit):null;
    }
    setProps(value){
        let extraPops = this.props.extraPops || {};
        this.p = {...this.props,type:'text',onChange:this.changeHandler,onBlur:this.onBlurHandler,...extraPops,value : value || this.props.value || this.props.defaultValue || '',id:this.id};
    }
    onBlurHandler(event)
    {
        this.props.onBlur && this.props.onBlur(event,{eventType:'blur',field:this.p.name,value:this.p.value,rawValue:this.p.value,id:this.id});
    }
    process(value)
    {
        let valueParts = value.toString().split('.');
        if(this.maxDigit && valueParts[0].length > this.maxDigit)
        {
            valueParts[0] = valueParts[0].substring(0,this.maxDigit);
        }

        if(!this.decimalPlace && value.toString().indexOf('.') > -1){
            valueParts.splice(1,1);
        }
        else if(valueParts[1] && valueParts[1].length > this.decimalPlace)
        {
            valueParts[1] = valueParts[1].substring(0,this.decimalPlace);
        }

        return valueParts.join('.');
    }
    changeHandler(event)
    {
        let value = event.target.value;
        const field = event.target.name;
        if(value && isNaN(Number(value))){
            this.setState({changed:true});
            return;
        }
        value = this.process(value);
        let tvalue = !value? value:this.decimalPlace>0?withDecimal(value,this.decimalPlace):parseInt(value);
        let rvalue = tvalue == value?value:tvalue;
        value = tvalue;
        this.p.value = rvalue;
        this.setState({value:value});
        if(this.p.min!=undefined || this.p.max!=undefined){
            this.processing = true;
            this.validationTimer && clearTimeout(this.validationTimer);
            this.validationTimer = null;
            let res = isValidRange(rvalue,this.p.min,this.p.max,(valid,pvalue)=>{
                let v = withDecimal(rvalue,this.decimalPlace),rawValue = rvalue == v?rvalue:v;
                console.log(v+'-----vvv-----'+rawValue);
                if(!valid){
                    v = (this.p.emptyValue ? "" : parseFloat(this.p.defaultValue || this.validValue));
                    rawValue = v;
                }
                else{
                    this.validValue = rvalue;
                }
                this.p.value = rawValue;
                this.setState({value:v},()=>this.processing=false);
                this.sendData(event,{value:v,rawValue,resetted:!valid});
            });
            this.validationTimer = res.timer;
            res.valid && this.sendData(event,{value:res.value,rawValue:rvalue});
        }
        else{
            this.sendData(event,{value,rawValue:rvalue});
        } 
    }
    sendData(event,data={})
    {
        this.props.onChange && this.props.onChange(event,{action:'click',field:this.p.name,id:this.id,...data});
    }
    componentDidUpdate()
    {
        //console.log(this.p.value +' -- '+this.props.value);
        if(!this.processing && this.valueChangable && this.p.value!=this.props.value && !isNaN(this.props.value))
        {
            this.p.value = this.props.value;
            this.setState({value:this.p.value});
        }
        this.setProps(this.p.value);
    }
    render(){
        const props = this.p;
        const validator = (props.validator && props.validator[props.name]) || {isInvalid:false};        
        return(
            <React.Fragment>
                {getField(props,validator)}
                <FormMsg htmlFor={this.id} error={translate(validator.message ||'')}/>
            </React.Fragment>
      )
    }
}

export class Input extends React.PureComponent{
    render(){
        const props = this.props;
        const validator = (props.validator && props.validator[props.name]) || {isInvalid:false};        
        return(
            <React.Fragment>
                {getField(props,validator)}
                <FormMsg htmlFor={props.id} error={translate(validator.message ||'')}/>
            </React.Fragment>
      )
    }
};
