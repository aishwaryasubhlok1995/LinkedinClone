import React, {Component} from 'react';
import '../../Css/details.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

//Define a Login Component
class Homepage extends Component
{
    //call the constructor method
    constructor(props)
    {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        // this.state = {
        //     firstname : "",
        //     lastname:"",
        //     username:"",
        //     password : ""
        // }
        //Bind the handlers to this class
        // this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        // this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        //  this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
    }
    //username change handler to update state variable with the text entered by the user
    // firstnameChangeHandler = (e) => {
    //     this.setState({
    //         firstname : e.target.value
    //     })
    // }

    // lastnameChangeHandler = (e) => {
    //     this.setState({
    //         lastname : e.target.value
    //     })
    // }

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
        // let redirect = null;
        // if(this.props.authFlag){
        //     redirect = <Redirect to= "/homepage"/>
        // }
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(  
                <div class="container">

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
<section id="ember2348" class="onboarding-profile-edu onboarding-widget__single-card-container mhA display-flex justify-center ember-view">
    <div id="ember2349" class="onboarding-profile-edu--has-min-width ember-view">
        <div id="ember2350" class="onboarding-profile-form full-width ember-view">  
            <div id="ember2351" class="ember-view">
                <div id="ember2352" class="mb2 onboarding-profile-edu__form-field onboarding-profile-form-field ember-view"> 
                     <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="typeahead-input-for-school-name">
                     School or College/University
                    </label>

                    <div class="onboarding-profile-edu__school-name">
                        <div id="ember2353" class="onboarding-profile-typeahead onboarding-form-field__typeahead onboarding-profile-typeahead__detailed-view ember-view">
                            <input role="combobox" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-owns="ember2354-results" aria-expanded="false" id="typeahead-input-for-school-name" type="text" />
                        </div>
                        <div role="status" aria-live="assertive" id="ember2356" class="onboarding-profile-insight onboarding-profile-edu__school-insight-container display-flex ml4 ember-view">
                        </div>  
                    </div>


                    <div id="ember2357" class="onboarding-profile-error-container ember-view"></div>
</div></div>


<section>
<h3 class="visually-hidden">Time period</h3>
<div class="onboarding-profile-edu__form-field-container pt1">
<div id="ember2358" class="mr5 onboarding-profile-edu__form-field onboarding-profile-edu__school-years-form-field flex-grow-1 ember-view"><div id="ember2359" class="onboarding-profile-form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="onboarding-profile-edu-start-year">
Start year
</label>

<span id="ember2360" class="ember-view">
<select data-control-name="profile_edu_start_year" id="onboarding-profile-edu-start-year" class="onboarding-input ember-view">  <option value="">-</option>

<option value="2018">2018</option>
<option value="2017">2017</option>
<option value="2016">2016</option>
<option value="2015">2015</option>
<option value="2014">2014</option>
<option value="2013">2013</option>
<option value="2012">2012</option>
<option value="2011">2011</option>
<option value="2010">2010</option>
<option value="2009">2009</option>
<option value="2008">2008</option>
<option value="2007">2007</option>
<option value="2006">2006</option>
<option value="2005">2005</option>
<option value="2004">2004</option>
<option value="2003">2003</option>
<option value="2002">2002</option>
<option value="2001">2001</option>
<option value="2000">2000</option>
<option value="1999">1999</option>
<option value="1998">1998</option>
<option value="1997">1997</option>
<option value="1996">1996</option>
<option value="1995">1995</option>
<option value="1994">1994</option>
<option value="1993">1993</option>
<option value="1992">1992</option>
<option value="1991">1991</option>
<option value="1990">1990</option>
<option value="1989">1989</option>
<option value="1988">1988</option>
<option value="1987">1987</option>
<option value="1986">1986</option>
<option value="1985">1985</option>
<option value="1984">1984</option>
<option value="1983">1983</option>
<option value="1982">1982</option>
<option value="1981">1981</option>
<option value="1980">1980</option>
<option value="1979">1979</option>
<option value="1978">1978</option>
<option value="1977">1977</option>
<option value="1976">1976</option>
<option value="1975">1975</option>
<option value="1974">1974</option>
<option value="1973">1973</option>
<option value="1972">1972</option>
<option value="1971">1971</option>
<option value="1970">1970</option>
<option value="1969">1969</option>
<option value="1968">1968</option>
<option value="1967">1967</option>
<option value="1966">1966</option>
<option value="1965">1965</option>
<option value="1964">1964</option>
<option value="1963">1963</option>
<option value="1962">1962</option>
<option value="1961">1961</option>
<option value="1960">1960</option>
<option value="1959">1959</option>
</select>
</span>


</div></div>

<div id="ember2422" class="onboarding-profile-edu__form-field onboarding-profile-edu__school-years-form-field flex-grow-1 ember-view"><div id="ember2423" class="onboarding-profile-form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="onboarding-profile-edu-end-year">
End year (or expected)
</label>

<span id="ember2424" class="ember-view">
<select data-control-name="profile_edu_end_year" id="onboarding-profile-edu-end-year" class="onboarding-input ember-view">  <option value="">-</option>

<option value="2025">2025</option>
<option value="2024">2024</option>
<option value="2023">2023</option>
<option value="2022">2022</option>
<option value="2021">2021</option>
<option value="2020">2020</option>
<option value="2019">2019</option>
<option value="2018">2018</option>
<option value="2017">2017</option>
<option value="2016">2016</option>
<option value="2015">2015</option>
<option value="2014">2014</option>
<option value="2013">2013</option>
<option value="2012">2012</option>
<option value="2011">2011</option>
<option value="2010">2010</option>
<option value="2009">2009</option>
<option value="2008">2008</option>
<option value="2007">2007</option>
<option value="2006">2006</option>
<option value="2005">2005</option>
<option value="2004">2004</option>
<option value="2003">2003</option>
<option value="2002">2002</option>
<option value="2001">2001</option>
<option value="2000">2000</option>
<option value="1999">1999</option>
<option value="1998">1998</option>
<option value="1997">1997</option>
<option value="1996">1996</option>
<option value="1995">1995</option>
<option value="1994">1994</option>
<option value="1993">1993</option>
<option value="1992">1992</option>
<option value="1991">1991</option>
<option value="1990">1990</option>
<option value="1989">1989</option>
<option value="1988">1988</option>
<option value="1987">1987</option>
<option value="1986">1986</option>
<option value="1985">1985</option>
<option value="1984">1984</option>
<option value="1983">1983</option>
<option value="1982">1982</option>
<option value="1981">1981</option>
<option value="1980">1980</option>
<option value="1979">1979</option>
<option value="1978">1978</option>
<option value="1977">1977</option>
<option value="1976">1976</option>
<option value="1975">1975</option>
<option value="1974">1974</option>
<option value="1973">1973</option>
<option value="1972">1972</option>
<option value="1971">1971</option>
<option value="1970">1970</option>
<option value="1969">1969</option>
<option value="1968">1968</option>
<option value="1967">1967</option>
<option value="1966">1966</option>
</select>
</span>


</div></div>
</div>

<div id="ember2486" class="onboarding-profile-error-container ember-view"></div>
</section>

<div id="ember2487" class="overflow-hidden focused-easeIn-motion onboarding-profile-edu__accordion--is-collapsed ember-view"><label class="m0" for="add-edu-over-16">
<div class="onboarding-profile-edu__form-field onboarding-profile-edu__over-16">
<p>I’m over 16</p>
<div class="onboarding-profile-edu__over-16-toggle-wrapper">
<div id="ember2488" class="toggle-24dp ember-view"><input data-control-name="profile_edu_is_over_16_toggle" tabindex="0" id="add-edu-over-16" class="ember-checkbox state-checkbox visually-hidden toggle-switch__input ember-view" type="checkbox" />

<label for="add-edu-over-16" class="toggle-switch__label">
<p class="checked t-14 t-black--light t-normal" aria-hidden="true">Yes</p>

  <span class="visually-hidden"></span>
</label>
</div>
</div>
</div>
</label>
</div>

<div id="ember2490" class="overflow-hidden focused-easeInOut-motion onboarding-profile-edu__accordion--is-collapsed ember-view"><section class="m0">
<fieldset>
<legend class="t-14 t-black t-bold pt4">Date of birth</legend>

<div id="ember2492" class="onboarding-profile-edu__form-field-container ember-view">
<div id="ember2493" class="onboarding-profile-form-field onboarding-profile-date flex-grow-1 onboarding-profile-edu__form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="onboarding-profile-edu-birthdate-month">
Month
</label>

<span id="ember2494" class="ember-view">
<select data-control-name="profile_edu_birthdate_month" id="onboarding-profile-edu-birthdate-month" class="onboarding-input ember-view">  <option value="">-</option>

<option value="1">January</option>
<option value="2">February</option>
<option value="3">March</option>
<option value="4">April</option>
<option value="5">May</option>
<option value="6">June</option>
<option value="7">July</option>
<option value="8">August</option>
<option value="9">September</option>
<option value="10">October</option>
<option value="11">November</option>
<option value="12">December</option>
</select>
</span>


</div>
<div id="ember2508" class="onboarding-profile-form-field onboarding-profile-date flex-grow-1 onboarding-profile-edu__form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="onboarding-profile-edu-birthdate-day">
Day
</label>

<span id="ember2509" class="ember-view"><select data-control-name="profile_edu_birthdate_day" id="onboarding-profile-edu-birthdate-day" class="onboarding-input ember-view" >  <option value="">-</option>

<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
</select>

</span>


</div>
<div id="ember2542" class="onboarding-profile-form-field onboarding-profile-date flex-grow-1 onboarding-profile-edu__form-field ember-view">  <label class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required" for="onboarding-profile-edu-birthdate-year">
Year
</label>

<span id="ember2543" class="ember-view">
<select data-control-name="profile_edu_birthdate_year" id="onboarding-profile-edu-birthdate-year" class="onboarding-input ember-view">  <option value="">-</option>

<option value="2018">2018</option>
<option value="2017">2017</option>
<option value="2016">2016</option>
<option value="2015">2015</option>
<option value="2014">2014</option>
<option value="2013">2013</option>
<option value="2012">2012</option>
<option value="2011">2011</option>
<option value="2010">2010</option>
<option value="2009">2009</option>
<option value="2008">2008</option>
<option value="2007">2007</option>
<option value="2006">2006</option>
<option value="2005">2005</option>
<option value="2004">2004</option>
<option value="2003">2003</option>
<option value="2002">2002</option>
<option value="2001">2001</option>
<option value="2000">2000</option>
<option value="1999">1999</option>
<option value="1998">1998</option>
<option value="1997">1997</option>
<option value="1996">1996</option>
<option value="1995">1995</option>
<option value="1994">1994</option>
<option value="1993">1993</option>
<option value="1992">1992</option>
<option value="1991">1991</option>
<option value="1990">1990</option>
<option value="1989">1989</option>
<option value="1988">1988</option>
<option value="1987">1987</option>
<option value="1986">1986</option>
<option value="1985">1985</option>
<option value="1984">1984</option>
<option value="1983">1983</option>
<option value="1982">1982</option>
<option value="1981">1981</option>
<option value="1980">1980</option>
<option value="1979">1979</option>
<option value="1978">1978</option>
<option value="1977">1977</option>
<option value="1976">1976</option>
<option value="1975">1975</option>
<option value="1974">1974</option>
<option value="1973">1973</option>
<option value="1972">1972</option>
<option value="1971">1971</option>
<option value="1970">1970</option>
<option value="1969">1969</option>
<option value="1968">1968</option>
<option value="1967">1967</option>
<option value="1966">1966</option>
<option value="1965">1965</option>
<option value="1964">1964</option>
<option value="1963">1963</option>
<option value="1962">1962</option>
<option value="1961">1961</option>
<option value="1960">1960</option>
<option value="1959">1959</option>
</select>
</span>


</div>  

</div>
<div id="ember2605" class="onboarding-profile-error-container ember-view"></div>


<p class="onboarding-profile-edu__error
t-14 t-black t-bold
overflow-hidden
focused-easeIn-motion
onboarding-profile-edu__accordion--is-collapsed mt0
" aria-expanded="false">
We love having ambitious people like you on LinkedIn, but you’re currently under our age limit.
</p>
</fieldset>
</section>
</div>

<footer class="mt5">
<button data-control-name="profile_edu_not_a_student" id="ember2606" class="onboarding-widget__cta onboarding-profile-cta button-tertiary-x-large full-width mb4 ember-view">  I’m not a student
</button>

<button data-control-name="profile_edu_continue" disabled="" id="ember2607" class="onboarding-widget__cta onboarding-profile-cta button-primary-x-large full-width ember-view">  Continue
</button>
</footer>
</div></div>
</section>
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
// const mapStateToProps = state =>{
//     console.log(state);
//     return {
//         authFlag : state.authFlag
//     }
// }

// const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle : (data) => {
//             axios.post('http://localhost:3001/login', data)
//                 .then((response) => {
//                     console.log(response.data);
//                     dispatch({type: 'LOGIN',payload : response.data.updatedList,statusCode : response.status})
//             });
//         }
//     }
// }
export default Homepage;
// export default connect(mapStateToProps,mapDispatchStateToProps)(SignupLogin;