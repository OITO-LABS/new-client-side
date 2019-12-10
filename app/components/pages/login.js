import React, { Component } from 'react';
import "assets/sass/pages/_login.scss";
import Logo from 'assets/images/logo.png';
import FormField from "../common/formfield";
import FormValidator from "../common/formvalidator";
import { FORGOT_PASSWORD, GOTO_URL, FLIP_LOADER, DASHBOARD, USER_SIGNIN, SHOW_ALERT_MSG, ALERT_TYPE, } from '../../utils/constants';
import dataService from "utils/dataservice";




export class Login extends Component {
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
                field: "password",
                method: "isEmpty",
                args: [{ ignore_whitespace: true }],
                validWhen: false,
                message: "Password is empty"
            },
            {
                field: 'username',
                method: this.validEmailData,
                args: [{ ignore_whitespace: true }],
                validWhen: true,
                message: 'Invalid format'
            },
            {
                field: "password",
                method: this.validatePassword,
                args: [{ ignore_whitespace: true }],
                validWhen: true,
                message: "Password must contain numbers,special characters,lowercase & uppercase alphabets"
            },
            // {
            //     field: 'newPassword',
            //     aliasField:'newPassword',
            //     method: this.checkPswdRulesMatched,
            //     validWhen: true,
            //     message: 'app.login.pswd_rules_invalid'
            // },
        ]);

        this.state = {
            username: "",
            password: ""

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validEmailData = this.validEmailData.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleInputChange(field) {
        // console.log(field);
        let name = field.target.name;
        let value = field.target.value;
        this.setState({
            [name]: value
        })
    }


    validateFieldData(value, args, state, validation, field) {
        return this.fieldData[field] && !!this.fieldData[field][args.propName];
    }

    onSubmit() {
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        // alert("onsubmit-clicked");

        if (validation.isValid) {
            let data = { username: this.state.username, password: this.state.password }
            dataService.postRequest("login", data)
                .then(res => {
                    if (res.response.status == "success") {
                        app.events.trigger(USER_SIGNIN, res);
                    }
                    else {
                        app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: "username and password doesnot match" });

                    }
                })
                .catch(err => { console.log(err) });
        }
    }

    handleForgotPassword() {
        app.events.trigger(GOTO_URL, { routerKey: FORGOT_PASSWORD });
    }

    validEmailData(value, args, state, validation, field) {
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return (validEmailRegex.test(value));
    }

    validatePassword(value, args, state, validation, field) {
        // const validPasswordRegex = RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/);
        const validPasswordRegex = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i);
        return (validPasswordRegex.test(value));
    }

    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    }

    render() {
        let validation = this.submitted
            ? this.validator.validate(this.state)
            : this.state.validation;
        // var assetId = this.props.match.params.assetId;
        return (
            <div className="container-fluid fluid">
                <div className="row">
                    <div className="col-md-8 mx-auto form">
                        <div className="col-md-12 mx-auto login-form text-center">
                            <div className="login-form-avatar col-md-4 mx-auto">
                                <img src={Logo} alt="AVATAR" className="login-avatar" />
                            </div>

                            <span className="login100-form-title ">
                                Account Login
                                </span>
                            <div className="row col-md-6 mx-auto input-fields">
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

                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    {/* <input className="input100" type="password" name="password" placeholder="Password" /> */}
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                    <FormField
                                        // label="Asset Key"
                                        // labelClassName="txt-label"
                                        fieldClassName="input100"
                                        mandatory
                                        // disabled={assetId != "-1"}
                                        name="password"
                                        onChange={this.handleInputChange}
                                        value={this.state.password}
                                        placeholder="password"
                                        type="password"
                                        validator={validation}
                                    />

                                </div>

                                <div className="submit text-center mx-auto">
                                    <button className="login100-form-btn" onClick={this.onSubmit}>
                                        Login
                                        </button>
                                </div>
                            </div>

                            <div className="text-center forgot-credentials">
                                <a href="#" className="txt1" onClick={this.handleForgotPassword}>
                                    Forgot Password?
                                    </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
