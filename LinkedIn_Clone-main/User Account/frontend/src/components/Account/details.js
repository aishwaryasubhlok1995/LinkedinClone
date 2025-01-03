import React, {Component} from 'react';
import '../../Css/details.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

//Define a Login Component
class details extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            jobtitle:"",
            company: ""
        }
        //Bind the handlers to this class
         this.jobChangeHandler = this.jobChangeHandler.bind(this);
         this.companyChangeHandler = this.companyChangeHandler.bind(this);
        //  this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
    }
    //username change handler to update state variable with the text entered by the user
    jobChangeHandler = (e) => {
        this.setState({
            jobtitle : e.target.value
        })
    }

    companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            jobtitle:this.state.jobtitle,
            company:this.state.company
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        console.log("post details data",data);
        this.props.onRegisterHandle(data);
    }
    // usernameChangeHandler = (e) => {
    //     this.setState({
    //         username : e.target.value
    //     })
    // }
    // // //password change handler to update state variable with the text entered by the user
    // passwordChangeHandler = (e) => {
    //     this.setState({
    //         password : e.target.value
    //     })
    // }
    // // //submit Login handler to send a request to the node backend
    // submitLogin = (e) => {
    //     var headers = new Headers();
    //     //prevent page from refresh
    //     e.preventDefault();
    //     const data = {
    //         email:this.state.username,
    //         password : this.state.password
    //     }
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     this.props.onSubmitHandle(data);
    // }
    render()
    {
        let redirectVar = null;
        if(this.props.details){
            redirectVar = <Redirect to= "/schooldetails"/>
        }
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(  
                <div class="container">
                {redirectVar}
                <div class="authentication-outlet nav-hidden">
                <div class="onboarding-main" role="main">
                <nav class="onboarding-main__nav full-width">
                    <div class="neptune-grid">
                        <a href="#" class="onboarding-main__nav-link ember-view">
                        <span class="visually-hidden">LinkedIn</span>
                        </a>
                    </div>
                </nav>

                <div class="onboarding-main__container">
        <div id="ember478" class="onboarding-stepper mhA ember-view"><artdeco-stepper id="ember479" class="artdeco-horizontal ember-view"><ul class="artdeco-stepper-list">
    <li id="ember481" class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered artdeco-progress ember-view">
<div class="artdeco-stepper-item-status-node-wrapper">
    <span class="artdeco-stepper-item-status-node">
        
    </span>
</div>

  <div class="artdeco-stepper-item-wrapper after">
          <span class="onboarding-stepper__step-type onboarding-stepper__step-type--is-active t-12 t-black t-bold mt1">
      Profile
    </span>

  </div>
</li>
<hr style={{'color':'black'}}></hr>
    <li id="ember483" class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered ember-view">
<div class="artdeco-stepper-item-status-node-wrapper">
    <span class="artdeco-stepper-item-status-node">
        
    </span>
</div>

  <div class="artdeco-stepper-item-wrapper after">
          <span class="onboarding-stepper__step-type t-12 t-black--light t-bold mt1">
      Community
    </span>

  </div>
</li>
<hr></hr>
    <li id="ember485" class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered ember-view">
<div class="artdeco-stepper-item-status-node-wrapper">
    <span class="artdeco-stepper-item-status-node">
        
    </span>
</div>

  <div class="artdeco-stepper-item-wrapper after">
          <span class="onboarding-stepper__step-type t-12 t-black--light t-bold mt1">
      Interests
    </span>

  </div>
</li>
</ul>
</artdeco-stepper></div>

<div id="ember486" class="ember-view">  
    <div id="ember487" class="ember-view"><div id="ember488" class="onboarding-widget onboarding-profile-edit neptune-grid ember-view">

  <div class="display-flex flex-column onboarding-widget__wrapper--is-full-height">
    <div class="flex-1">
      <header id="ember489" class="onboarding-header mhA text-align-center pv6 ember-view">    <h1 class="onboarding-header__title mb2">Your profile helps you discover the right people and opportunities</h1>

</header>

        <section class="onboarding-widget__single-card-container onboarding-profile-edit__container mhA">
<div id="ember490" class="onboarding-profile-form full-width ember-view">            <div id="ember491" class="ember-view"><div id="ember492" class="mb2 onboarding-profile-edit__form-field onboarding-profile-form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="typeahead-input-for-title">
    Most recent job title
  </label>

<div id="ember493" class="onboarding-profile-typeahead onboarding-profile-typeahead__simple-view ember-view"><artdeco-typeahead-deprecated id="ember494" class="ember-view">


<artdeco-typeahead-deprecated-input id="ember495" class="ember-view">
<input role="combobox" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-owns="ember494-results" aria-expanded="false" id="typeahead-input-for-title" type="text" onChange = {this.jobChangeHandler} />
</artdeco-typeahead-deprecated-input>
</artdeco-typeahead-deprecated>
<div role="status" aria-live="assertive" id="ember496" class="onboarding-profile-insight onboarding-profile-edit__jobs-title-insight-container ember-view"></div>
</div>

  <div id="ember497" class="onboarding-profile-error-container ember-view"></div>
</div></div>
            <div id="ember498" class="ember-view"><div id="ember499" class="mt3 mb2 onboarding-profile-edit__form-field onboarding-profile-form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="typeahead-input-for-company">
    Most recent company
  </label>

<div id="ember500" class="onboarding-profile-typeahead onboarding-profile-typeahead__detailed-view ember-view">


<input role="combobox" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-owns="ember501-results" aria-expanded="false" id="typeahead-input-for-company" type="text" onChange = {this.companyChangeHandler}/>
<div role="status" aria-live="assertive" id="ember503" class="onboarding-profile-insight onboarding-profile-edit__jobs-title-insight-container ember-view"></div>
</div>

  <div id="ember504" class="onboarding-profile-error-container ember-view"></div>
</div></div>


            <footer class="mt5">
              <button data-control-name="profile_edit_is_student" id="ember505" class="onboarding-widget__cta button-tertiary-x-large full-width mb4 ember-view" onClick = {this.submitLogin}>  I’m a student
            </button>

              <button data-control-name="continue" disabled class="onboarding-widget__cta button-primary-x-large full-width ember-view">  Continue
                </button>
            </footer>
</div>        </section>
    </div>
</div>
</div></div>


</div>
  <div id="ember507" class="ember-view"></div>


  </div>
                </div>
                </div>

                </div>
                                            
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return {
        details : state.details
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onRegisterHandle : (data) => {
            axios.post('http://localhost:3001/prodetails', data)
                .then((response) => {
                    console.log(response.data);
                    dispatch({type: 'DETAILS',payload : response.data.updatedList,statusCode : response.status})
            });
        }
    }
}
//export default details;
export default connect(mapStateToProps,mapDispatchStateToProps)(details);