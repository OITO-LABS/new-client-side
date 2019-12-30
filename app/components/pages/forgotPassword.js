import React, { Component } from 'react';
import "assets/sass/pages/_login.scss";
import Logo from 'assets/images/logo.png';
import FormField from "../common/formfield";
import FormValidator from "../common/formvalidator";
import { SHOW_ALERT_MSG, ALERT_TYPE, } from 'utils/constants';
import dataService from "utils/dataservice";


export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.validateFieldData = this.validateFieldData.bind(this);
        this.validator = new FormValidator([
            {
                field: "username",
                method: "isEmpty",
                args: [{ ignore_whitespace: true }],
                validWhen: false,
                message: "Username is empty"
            },
            {
                field: 'username',
                method: this.validEmailData,
                args: [{ ignore_whitespace: true }],
                validWhen: true,
                message: 'Invalid format'
            },
        ]);
        this.state = {
            passwordResetLinkSent:false

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validEmailData = this.validEmailData.bind(this);
    }

    validateFieldData(value, args, state, validation, field) {
        return this.fieldData[field] && !!this.fieldData[field][args.propName];
    }

    handleInputChange(field) {
        let name = field.target.name;
        let value = field.target.value;
        this.setState({
            [name]: value
        })
    }


    onSubmit() {
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        // alert("onsubmit-clicked");

        if (validation.isValid) {
            dataService.formDataRequest("forgot", { to: this.state.username })
                .then(res => {
                    console.log(res);
                    if (res.status == "success") {
                        this.setState({
                            passwordResetLinkSent:true
                        })
                        // app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.SUCCESS, msg: "A password reset Link is sent to your registered Email" });
                    }
                    else {
                        alert("status failed is getting from server");
                        app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: `${res.message}` });
                    }
                })
                .catch(err => { console.log(err) });
        }
    }

    validEmailData(value, args, state, validation, field) {
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return (validEmailRegex.test(value));
    }

    render() {
        let validation = this.submitted
            ? this.validator.validate(this.state)
            : this.state.validation;
        // var assetId = this.props.match.params.assetId;
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
                                    Forgot Password/Reset password
                                </span>
                                {!this.state.passwordResetLinkSent?
                                <div className="row col-md-6 mx-auto input-fields">
                                    <div className="text-center forgot-credentials forgot-password">
                                        <h3 className="txt1" >
                                            Please enter your registered Email address as username...
                                        </h3>
                                    </div>


                                    <div className="wrap-input100 validate-input" data-validate="Username is required">
                                        {/* <input className="input100" type="text" name="username" placeholder="Username"/> */}
                                        <FormField
                                            // label="Asset Key"
                                            // labelClassName="txt-label"
                                            fieldClassName="input100"
                                            mandatory
                                            // disabled={assetId != "-1"}
                                            name="username"
                                            onChange={this.handleInputChange}
                                            value={this.state.username}
                                            placeholder="username"
                                            validator={validation}
                                        />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-user"></i>
                                        </span>
                                    </div>
                                    <div className="submit text-center mx-auto">
                                        <button className="login100-form-btn" onClick={this.onSubmit}>
                                            Submit
                                </button>
                                    </div>
                                </div>
                                :
                                <div className="row col-md-6 mx-auto input-fields">
                                    <div className="text-center forgot-credentials forgot-password">
                                        <h3 className="txt1" >
                                            A password Reset link is sent to your registered email id.. please check your registered email id
                                        </h3>
                                    </div>
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ForgotPassword;
