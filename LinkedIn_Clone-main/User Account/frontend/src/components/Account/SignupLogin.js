import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

//Define a Login Component
class SignupLogin extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname:"",
            username:"",
            password : ""
        }
        //Bind the handlers to this class
         this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
         this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
    }
    //username change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    // //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    // //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        console.log("in submit login");
        if(this.state.username=="" || this.state.password=="")
        {
            alert("Username and password are required");
        }
        else
        {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username:this.state.username,
            password : this.state.password
        }
        console.log("username and password in submit login",data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.onSubmitHandle(data);
    }
    }
    submitRegister = (e) => {
        console.log("in submit register");
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username:this.state.username,
            password : this.state.password,
            firstname:this.state.firstname,
            lastname:this.state.lastname
        }
        console.log("data in submit register",data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.onRegisterHandle(data);
    }
    render()
    {
        let redirectVar = null;
        if(this.props.authFlag){
            redirectVar = <Redirect to= "/homepage"/>
        }
        if(this.props.inserted)
        {
            redirectVar = <Redirect to="/postsignup" />
        }
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(  
            
                <div class="container">
                {redirectVar}
                <main id="layout-main" role="main">
                <div class="global-wrapper artdeco-a">
                    <div class="header">
                        <div class="wrapper">
                            <h1><img class="lazy-loaded" alt="LinkedIn" src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" /></h1>
                                <div class="login-form">
                                    <label for="login-email">Email</label>
                                    <input type="text" class="login-email" placeholder="Email" onChange = {this.usernameChangeHandler} style={{'background':'white'}} />    
                                    <label for="login-password">Password</label>
                                        <input type="password" name="session_password" class="login-password" id="login-password" aria-required="true" tabindex="1" placeholder="Password" style={{'background':'white'}} onChange = {this.passwordChangeHandler} />
                                        <input tabindex="1" id="login-submit" class="login submit-button" type="submit" value="Sign in" disabled="" onClick = {this.submitLogin} />
                                        <a class="link-forgot-password" tabindex="1" href="#">Forgot password?</a>
                                            <div id="login-callout" class="hopscotch-bubble animated hopscotch-callout no-number hidden" tabindex="-1" role="alert" aria-live="polite">
                                            <div class="hopscotch-bubble-container">
                                            <div class="hopscotch-bubble-content">
                                                <h3 class="hopscotch-title">Trying to sign in?</h3>
                                                <div class="hopscotch-content">Someone's already using that email. If that’s you, enter your Email and password here to sign in.
                                                </div>
                                            </div>
                                            <a title="Close" href="#" class="hopscotch-bubble-close hopscotch-close">Close</a>
                                            </div>
                                            <div class="hopscotch-bubble-arrow-container hopscotch-arrow up"></div>
                                            </div>
                                                <input name="isJsEnabled" type="hidden" value="false" />
                                                <input name="loginCsrfParam" id="loginCsrfParam-login" type="hidden" value="513c0162-d4e4-4a50-8dae-770874cc6450" />
                                            </div></div></div>
                       
                                            
                <div class="main background lazy-loaded show-join">
                    <form class="reg-form" method="POST">
                        <h2 class="title">Be great at what you do</h2>
                        <h3 class="subtitle">Get started - it's free.</h3>
                        <div class="reg-alert hidden" role="alert" tabindex="-1">
                            <div class="wrapper">
                                <p class="message">
                                    <span class="alert-content"></span>
                                </p>
                                <button class="dismiss dismiss-alert">
                                    <li-icon type="cancel-icon" size="small" a11y-text="Dismiss"></li-icon>
                                </button>
                            </div>
                        </div>
                        <section class="form-body">
                            <label for="reg-firstname">First name</label>
                            <input type="text" name="firstName" class="reg-firstname" aria-required="true" tabindex="1" placeholder="" onChange = {this.firstnameChangeHandler} />
                            <label for="reg-lastname">Last name</label>
                            <input type="text" name="lastName" class="reg-lastname" aria-required="true" tabindex="1" placeholder="" onChange = {this.lastnameChangeHandler} />
                            <label for="reg-email">Email</label>
                            <input type="text" name="session_key" class="reg-email" autocapitalize="off" tabindex="4"  autofocus="autofocus" onChange = {this.usernameChangeHandler} />
                            <label for="reg-password">Password (6 or more characters)</label>
                            <input type="password" name="session_password" class="reg-password"  aria-required="true" tabindex="4" autocomplete="new-password" onChange = {this.passwordChangeHandler} />
                            <span class="agreement">By clicking Join now, you agree to the LinkedIn <a tabindex="4" href="https://www.linkedin.com/legal/user-agreement">User Agreement</a>, <a tabindex="4" href="https://www.linkedin.com/legal/privacy-policy">Privacy Policy</a>, and <a tabindex="4" href="https://www.linkedin.com/legal/cookie-policy">Cookie Policy</a>.</span>
                            <input tabindex="4" id="registration-submit" class="registration submit-button" type="submit" value="Join now" onClick = {this.submitRegister} />
                        </section>
                    </form>
                </div>


                </div>
                </main>
                </div>
                                            
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return {
        authFlag : state.authFlag,
        inserted:state.inserted
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            console.log("username and password in mapstate to props",data);
            axios.post('http://localhost:3001/login', data)
                .then((response) => {
                    console.log("response from login",response);
                    if(response.data.updatedList.status=="400")
                    {
                        alert("incorrect username or password");
                    }
                    else
                    {
                    console.log(response.data);
                    dispatch({type: 'LOGIN',payload : response.data.updatedList,statusCode : response.status})
                    }
            });
        },
        onRegisterHandle : (data) => {
            console.log("data in mapstate to props",data);
            axios.post('http://localhost:3001/register', data)
                .then((response) => {
                    console.log(response.data);
                    dispatch({type: 'SIGNUP',payload : response.data.updatedList,statusCode : response.status})
            });
        }
    }
}
//export default SignupLogin;
export default connect(mapStateToProps,mapDispatchStateToProps)(SignupLogin);