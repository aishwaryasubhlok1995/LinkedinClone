import React, { Component } from "react";
import "../../css/schooldetails.css";
import { getSignupToken } from "../common/auth";
import { Redirect } from "react-router";
import axios from "axios";
import { connect } from "react-redux";
import { signupschool } from "../../actions/applicantActions";

//Define a Login Component
class UserSchoolData extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      school: "",
      startyear: "",
      endyear: ""
    };
    //Bind the handlers to this class
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.startyearChangeHandler = this.startyearChangeHandler.bind(this);
    this.endyearChangeHandler = this.endyearChangeHandler.bind(this);
    this.submitSchool = this.submitSchool.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {}

  schoolChangeHandler = e => {
    this.setState({
      school: e.target.value
    });
  };

  startyearChangeHandler = e => {
    this.setState({
      startyear: e.target.value
    });
  };

  endyearChangeHandler = e => {
    this.setState({
      endyear: e.target.value
    });
  };

  submitSchool = e => {
    var headers = new Headers();
    console.log("in submit school method");
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: localStorage.getItem("signup"),
      school: this.state.school,
      startyear: this.state.startyear,
      endyear: this.state.endyear
    };
    console.log(data);
    axios.defaults.withCredentials = true;
    this.props.signupschool(data);
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    // const signupStatus = getSignupToken();

    const signupStatus = getSignupToken();

    let redirectVar = null;
    if (signupStatus === false) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
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
              <div id="ember478" class="onboarding-stepper mhA ember-view">
                <artdeco-stepper
                  id="ember479"
                  class="artdeco-horizontal ember-view"
                >
                  <ul class="artdeco-stepper-list">
                    <li
                      id="ember481"
                      class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered artdeco-progress ember-view"
                    >
                      <div class="artdeco-stepper-item-status-node-wrapper">
                        <span class="artdeco-stepper-item-status-node" />
                      </div>

                      <div class="artdeco-stepper-item-wrapper after">
                        <span class="onboarding-stepper__step-type onboarding-stepper__step-type--is-active t-12 t-black t-bold mt1">
                          Profile
                        </span>
                      </div>
                    </li>
                    <hr style={{ color: "black" }} />
                    <li
                      id="ember483"
                      class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered ember-view"
                    >
                      <div class="artdeco-stepper-item-status-node-wrapper">
                        <span class="artdeco-stepper-item-status-node" />
                      </div>

                      <div class="artdeco-stepper-item-wrapper after">
                        <span class="onboarding-stepper__step-type t-12 t-black--light t-bold mt1">
                          Community
                        </span>
                      </div>
                    </li>
                    <hr />
                    <li
                      id="ember485"
                      class="artdeco-stepper-item onboarding-stepper__node-size artdeco-centered ember-view"
                    >
                      <div class="artdeco-stepper-item-status-node-wrapper">
                        <span class="artdeco-stepper-item-status-node" />
                      </div>

                      <div class="artdeco-stepper-item-wrapper after">
                        <span class="onboarding-stepper__step-type t-12 t-black--light t-bold mt1">
                          Interests
                        </span>
                      </div>
                    </li>
                  </ul>
                </artdeco-stepper>
              </div>

              <div id="ember486" class="ember-view">
                <div id="ember487" class="ember-view">
                  <div
                    id="ember488"
                    class="onboarding-widget onboarding-profile-edit neptune-grid ember-view"
                  >
                    <div class="display-flex flex-column onboarding-widget__wrapper--is-full-height">
                      <div class="flex-1">
                        <header
                          id="ember489"
                          class="onboarding-header mhA text-align-center pv6 ember-view"
                        >
                          {" "}
                          <h1 class="onboarding-header__title mb2">
                            Your profile helps you discover the right people and
                            opportunities
                          </h1>
                        </header>

                        <section
                          id="ember2995"
                          class="onboarding-profile-edu onboarding-widget__single-card-container mhA display-flex justify-center ember-view"
                        >
                          <div
                            id="ember2996"
                            class="onboarding-profile-edu--has-min-width ember-view"
                          >
                            <div
                              id="ember2997"
                              class="onboarding-profile-form full-width ember-view"
                            >
                              {" "}
                              <div id="ember2998" class="ember-view">
                                <div
                                  id="ember2999"
                                  class="mb2 onboarding-profile-edu__form-field onboarding-profile-form-field ember-view"
                                >
                                  {" "}
                                  <label
                                    class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required"
                                    for="typeahead-input-for-school-name"
                                  >
                                    School or College/University
                                  </label>
                                  <div class="onboarding-profile-edu__school-name">
                                    <div
                                      id="ember3000"
                                      class="onboarding-profile-typeahead onboarding-form-field__typeahead onboarding-profile-typeahead__detailed-view ember-view"
                                    >
                                      <artdeco-typeahead-deprecated
                                        id="ember3001"
                                        class="ember-view"
                                      >
                                        <artdeco-typeahead-deprecated-input
                                          id="ember3002"
                                          class="ember-view"
                                        >
                                          <input
                                            role="combobox"
                                            autocomplete="off"
                                            spellcheck="false"
                                            aria-autocomplete="list"
                                            aria-owns="ember3001-results"
                                            aria-expanded="false"
                                            id="typeahead-input-for-school-name"
                                            type="text"
                                            placeholder="Enter School"
                                            onChange={this.schoolChangeHandler}
                                          />
                                        </artdeco-typeahead-deprecated-input>
                                      </artdeco-typeahead-deprecated>
                                    </div>
                                    <div
                                      role="status"
                                      aria-live="assertive"
                                      id="ember3003"
                                      class="onboarding-profile-insight onboarding-profile-edu__school-insight-container display-flex ml4 ember-view"
                                    />{" "}
                                  </div>
                                  <div
                                    id="ember3004"
                                    class="onboarding-profile-error-container ember-view"
                                  />
                                </div>
                              </div>
                              <section>
                                <h3 class="visually-hidden">Time period</h3>
                                <div class="onboarding-profile-edu__form-field-container pt1">
                                  <div
                                    id="ember3005"
                                    class="mr5 onboarding-profile-edu__form-field onboarding-profile-edu__school-years-form-field flex-grow-1 ember-view"
                                  >
                                    <div
                                      id="ember3006"
                                      class="onboarding-profile-form-field ember-view"
                                    >
                                      {" "}
                                      <label
                                        class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required"
                                        for="onboarding-profile-edu-start-year"
                                      >
                                        Start year
                                      </label>
                                      <span id="ember3007" class="ember-view">
                                        <select
                                          data-control-name="profile_edu_start_year"
                                          id="onboarding-profile-edu-start-year"
                                          class="onboarding-input ember-view"
                                          placeholder="Start Year"
                                          onChange={this.startyearChangeHandler}
                                        >
                                          {" "}
                                          <option
                                            value="Start Year"
                                            placeholder="Start Year"
                                          >
                                            -
                                          </option>
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

                                  <div
                                    id="ember3069"
                                    class="onboarding-profile-edu__form-field onboarding-profile-edu__school-years-form-field flex-grow-1 ember-view"
                                  >
                                    <div
                                      id="ember3070"
                                      class="onboarding-profile-form-field ember-view"
                                    >
                                      <label
                                        class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate onboarding-profile-form-field__label--required"
                                        for="onboarding-profile-edu-end-year"
                                      >
                                        End year (or expected)
                                      </label>

                                      <span id="ember3071" class="ember-view">
                                        <select
                                          data-control-name="profile_edu_end_year"
                                          id="onboarding-profile-edu-end-year"
                                          class="onboarding-input ember-view"
                                          onChange={this.endyearChangeHandler}
                                        >
                                          {" "}
                                          <option
                                            value="End Year"
                                            placeholder="End Year"
                                          >
                                            -
                                          </option>
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
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <footer class="mt5">
                                <button
                                  data-control-name="profile_edu_continue"
                                  disabled=""
                                  id="ember3254"
                                  class="onboarding-widget__cta onboarding-profile-cta button-primary-x-large full-width ember-view"
                                  onClick={this.submitSchool}
                                >
                                  Continue
                                </button>
                              </footer>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="ember507" class="ember-view" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    signupschool: state.signupschool
  };
};

export default connect(
  mapStateToProps,
  { signupschool }
)(UserSchoolData);
