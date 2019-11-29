import React, { Component } from 'react';
import "assets/sass/pages/_login.scss";
import Logo from 'assets/images/logo.png';
import {FLIP_LOADER}  from "utils/constants";
import FormValidator from '../common/formvalidator';
import FormField from "../common/formfield";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.validateFieldData = this.validateFieldData.bind(this);
        this.validEmailData = this.validEmailData.bind(this);
        this.validator = new FormValidator([
            { 
                field: 'username',
                aliasField:'username',
                method: 'isEmpty',
                args:[{ignore_whitespace:true}],
                validWhen: false,
                message: 'Username is empty'
            },
            {
                field: 'username', 
                aliasField:'username',
                method: this.validEmailData, 
                args:[{ignore_whitespace:true}],
                validWhen: true, 
                message: 'Invalid format'
            },
            {
                field: 'newPassword',
                aliasField:'newPassword',
                method: 'isEmpty',
                args:[{ignore_whitespace:true}],
                validWhen: false,
                message: 'Password is empty'
            },
            {
                field: 'newPassword',
                aliasField:'newPassword',
                method: this.checkPswdRulesMatched,
                validWhen: true,
                message: 'Password must contain numbers,special characters,lowercase & uppercase alphabets'
            },
            {
                field: 'cpassword',
                aliasField:'cpassword',
                method: 'isEmpty',
                args:[{ignore_whitespace:true}],
                validWhen: false,
                message: 'Password is empty'
              },
        ])

        this.state = {
            ...this.getStateData(this.props),
            validation: this.validator.valid(),
        }        

        this.fieldData = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.checkPswdRulesMatched = this.checkPswdRulesMatched.bind(this);
    }
    
    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    }

    validEmailData(value,args, state, validation,field) {
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return(validEmailRegex.test(value));
    }

    checkPswdRulesMatched(value,args, state, validation,field) {
        const validPasswordRegex = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i);
        return(validPasswordRegex.test(value));
    }

    onReset() {
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        
    }

    getStateData(data) {
        return {
          username: data.username || "",
          newPassword: data.newPassword || "",
          cpassword: data.cpassword || "",
        }
    }

    handleInputChange(event, fieldData = {}) {
        let field = fieldData.field || event.target.name;
        let value = fieldData.value || event.target.value || "";
        this.fieldData[field] = fieldData;
        event && this.setState({
            [field]: event.target.type == "checkbox" ? event.target.checked : value
        });
    }

    validateFieldData(value,args, state, validation,field){
        return this.fieldData[field] && !!this.fieldData[field][args.propName];
    }
     
    render() {
        let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation;
        return (
            <div className="container-fluid fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto form">
                            <div className="col-md-12 mx-auto login-form text-center">
                                <div className="login-form-avatar col-md-4 mx-auto">
                                    <img src={Logo} alt="AVATAR" className="login-avatar" />
                                </div>

                                <span className="login100-form-title ">
                                    Reset Password
                                </span>
                                <div className="row col-md-6 mx-auto input-fields">
                                    <div className="wrap-input100 validate-input">
                                        <FormField
                                            fieldClassName="input100"
                                            mandatory
                                            name="username"
                                            onChange={this.handleInputChange}
                                            value={this.state.username}
                                            placeholder="Enter registered mail id"
                                            validator={validation}
                                        />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-user"></i>
                                        </span>
                                    </div>

                                    <div className="wrap-input100 validate-input">
                                        <FormField
                                            fieldClassName="input100"
                                            mandatory
                                            name="newPassword"
                                            onChange={this.handleInputChange}
                                            value={this.state.newPassword}
                                            placeholder="Password"
                                            type="password"
                                            validator={validation}
                                        />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>

                                    <div className="wrap-input100 validate-input">
                                        <FormField
                                            fieldClassName="input100"
                                            mandatory
                                            name="cpassword"
                                            onChange={this.handleInputChange}
                                            value={this.state.cpassword}
                                            placeholder="Confirm Password"
                                            type="password"
                                            validator={validation}
                                        />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>

                                    <div className="submit text-center mx-auto">
                                        <button className="login100-form-btn" onClick={this.onReset}>
                                            Reset 
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center forgot-credentials">
                                    <a href="#" className="txt1" onClick={this.handleForgotPassword}>
                                        Forgot Username / Password?
                                </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword
