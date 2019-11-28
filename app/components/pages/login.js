import React, { Component } from 'react';
import "assets/sass/pages/_login.scss";
import Logo from 'assets/images/logo.png';

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div class="container-fluid fluid">
        <div class="container">
            
            <div class="row">
                    <div class="col-md-8 mx-auto form">
                            <form class="col-md-12 mx-auto login-form text-center">
                                <div class="login-form-avatar col-md-4 mx-auto">
                                    <img src={Logo} alt="AVATAR" class="login-avatar"/>
                                </div>
            
                                <span class="login100-form-title ">
                                    Account Login
                                </span>
                                <div class="row col-md-6 mx-auto input-fields">
                                    <div class="wrap-input100 validate-input" data-validate = "Username is required">
                                        <input class="input100" type="text" name="username" placeholder="Username"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-user"></i>
                                        </span>
                                    </div>
                
                                    <div class="wrap-input100 validate-input" data-validate = "Password is required">
                                        <input class="input100" type="password" name="pass" placeholder="Password"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock"></i>
                                        </span>
                                    </div>

                                    <div class="submit text-center mx-auto">
                                        <button class="login100-form-btn">
                                            Login
                                        </button>
                                    </div>
                                </div>
            
                                <div class="text-center forgot-credentials">
                                    <a href="#" class="txt1">
                                        Forgot Username / Password?
                                    </a>
                                </div>
            
                            </form>
                        </div>
            </div>
        </div>
    </div>
        );
    }
}

export default Login;
