import React, { Component } from 'react';
import "assets/sass/pages/_login.scss";
import Logo from 'assets/images/logo.png';
import FormField from "../common/formfield";
import FormValidator from "../common/formvalidator";



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

        ]);

        this.state = {

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);


    }

    handleInputChange(field) {
        console.log(field);
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
    }
    handleForgotPassword() {
        alert("forgot password clicked");
    }

    render() {
        let validation = this.submitted
            ? this.validator.validate(this.state)
            : this.state.validation;
        // var assetId = this.props.match.params.assetId;
        return (
            <div class="container-fluid fluid">
                <div class="container">

                    <div class="row">
                        <div class="col-md-8 mx-auto form">
                            <div class="col-md-12 mx-auto login-form text-center">
                                <div class="login-form-avatar col-md-4 mx-auto">
                                    <img src={Logo} alt="AVATAR" class="login-avatar" />
                                </div>

                                <span class="login100-form-title ">
                                    Account Login
                                </span>
                                <div class="row col-md-6 mx-auto input-fields">
                                    <div class="wrap-input100 validate-input" data-validate="Username is required">
                                        {/* <input class="input100" type="text" name="username" placeholder="Username"/> */}
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
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </div>

                                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                                        {/* <input class="input100" type="password" name="password" placeholder="Password" /> */}
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
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </div>

                                    <div class="submit text-center mx-auto">
                                        <button class="login100-form-btn" onClick={this.onSubmit}>
                                            Login
                                        </button>
                                    </div>
                                </div>

                                <div class="text-center forgot-credentials">
                                    <a href="#" class="txt1" onClick={this.handleForgotPassword}>
                                        Forgot Username / Password?
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
