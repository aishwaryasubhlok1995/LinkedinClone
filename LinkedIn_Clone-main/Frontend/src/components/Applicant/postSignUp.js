import React, { Component } from "react";
import "../../css/postSignUp.css";
import axios from "axios";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { locationData } from "../../actions/applicantActions";
import { getSignupToken } from "../common/auth";

//Define a Login Component
class PostSignUp extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      country: "",
      zipcode: "",
      userstate: "",
      city: ""
    };
    //Bind the handlers to this class
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {}
  //username change handler to update state variable with the text entered by the user
  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
  };

  zipcodeChangeHandler = e => {
    this.setState({
      zipcode: e.target.value
    });
  };

  stateChangeHandler = e => {
    this.setState({
      userstate: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  submitLogin = e => {
    var country = this.state.country;
    if (this.state.country == "") {
      country = "us";
      this.setState({ country: "us" });
    }

    var zipcode = this.state.zipcode;
    if (zipcode == "") window.alert("Postal code cannot be empty.");
    else if (
      !(/^[0-9]{5}$/.test(zipcode) || /^[0-9]{5}[-][0-9]{4}$/.test(zipcode))
    ) {
      window.alert("Incorrect zipcode format");
    } else {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        country: country,
        zipcode: this.state.zipcode,
        city: this.state.city,
        userstate: this.state.userstate,
        username: localStorage.getItem("signup")
      };
      console.log(data);
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log("post sign up data", data);
      this.props.locationData(data);
    }
  };

  render() {
    // const signupStatus = getSignupToken();
    let redirectVar = null;
    // if (signupStatus === false) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    // if(this.props.authFlag){
    //     redirect = <Redirect to= "/homepage"/>
    // }
    //redirect based on successful login

    if (this.props.location) {
      redirectVar = <Redirect to="/applicantdetails" />;
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
              <div id="ember39" class="ember-view">
                <div id="ember40" class="ember-view">
                  <div
                    id="ember41"
                    class="onboarding-widget onboarding-profile-location neptune-grid ember-view"
                  >
                    <div class="display-flex flex-column onboarding-widget__wrapper--is-full-height">
                      <div class="flex-1">
                        <header
                          id="ember42"
                          class="onboarding-header mhA text-align-center pv6 ember-view"
                        >
                          {" "}
                          <h1 class="onboarding-header__title mb2">
                            Welcome, {this.props.firstname}
                          </h1>
                          <h2 class="onboarding-header__subtitle">
                            Let’s start your profile, connect to people you
                            know, and engage with them on topics you care about.
                          </h2>
                        </header>

                        <section class="onboarding-widget__single-card-container mhA">
                          <div
                            id="ember43"
                            class="onboarding-profile-form full-width ember-view"
                          >
                            <div id="ember45" class="ember-view">
                              <div
                                id="ember46"
                                class="onboarding-profile-form-field onboarding-profile-location__field-container pt3 pb2 ember-view"
                              >
                                {" "}
                                <label
                                  class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate "
                                  for="location-country"
                                >
                                  Country/Region
                                </label>
                                <select
                                  data-control-name="location_country_chooser"
                                  id="location-country"
                                  class="onboarding-input ember-view"
                                  onChange={this.countryChangeHandler}
                                >
                                  <option value="us">United States</option>
                                  <option value="af">Afghanistan</option>
                                  <option value="ax">Aland Islands</option>
                                  <option value="al">Albania</option>
                                  <option value="dz">Algeria</option>
                                  <option value="as">American Samoa</option>
                                  <option value="ad">Andorra</option>
                                  <option value="ao">Angola</option>
                                  <option value="ai">Anguilla</option>
                                  <option value="aq">Antarctica</option>
                                  <option value="ag">
                                    Antigua and Barbuda
                                  </option>
                                  <option value="ar">Argentina</option>
                                  <option value="am">Armenia</option>
                                  <option value="aw">Aruba</option>
                                  <option value="au">Australia</option>
                                  <option value="at">Austria</option>
                                  <option value="az">Azerbaijan</option>
                                  <option value="bs">Bahamas</option>
                                  <option value="bh">Bahrain</option>
                                  <option value="bd">Bangladesh</option>
                                  <option value="bb">Barbados</option>
                                  <option value="by">Belarus</option>
                                  <option value="be">Belgium</option>
                                  <option value="bz">Belize</option>
                                  <option value="bj">Benin</option>
                                  <option value="bm">Bermuda</option>
                                  <option value="bt">Bhutan</option>
                                  <option value="bo">Bolivia</option>
                                  <option value="ba">
                                    Bosnia and Herzegovina
                                  </option>
                                  <option value="bw">Botswana</option>
                                  <option value="bv">Bouvet Island</option>
                                  <option value="br">Brazil</option>
                                  <option value="io">
                                    British Indian Ocean Territory
                                  </option>
                                  <option value="bn">Brunei Darussalam</option>
                                  <option value="bg">Bulgaria</option>
                                  <option value="bf">Burkina Faso</option>
                                  <option value="bi">Burundi</option>
                                  <option value="kh">Cambodia</option>
                                  <option value="cm">Cameroon</option>
                                  <option value="ca">Canada</option>
                                  <option value="cv">Cape Verde</option>
                                  <option value="cb">Caribbean Nations</option>
                                  <option value="ky">Cayman Islands</option>
                                  <option value="cf">
                                    Central African Republic
                                  </option>
                                  <option value="td">Chad</option>
                                  <option value="cl">Chile</option>
                                  <option value="cn">China</option>
                                  <option value="cx">Christmas Island</option>
                                  <option value="cc">
                                    Cocos (Keeling) Islands
                                  </option>
                                  <option value="co">Colombia</option>
                                  <option value="km">Comoros</option>
                                  <option value="cg">Congo</option>
                                  <option value="ck">Cook Islands</option>
                                  <option value="cr">Costa Rica</option>
                                  <option value="ci">
                                    Cote D’Ivoire (Ivory Coast)
                                  </option>
                                  <option value="hr">Croatia</option>
                                  <option value="cu">Cuba</option>
                                  <option value="cy">Cyprus</option>
                                  <option value="cz">Czech Republic</option>
                                  <option value="cd">
                                    Democratic Republic of the Congo
                                  </option>
                                  <option value="dk">Denmark</option>
                                  <option value="dj">Djibouti</option>
                                  <option value="dm">Dominica</option>
                                  <option value="do">Dominican Republic</option>
                                  <option value="ec">Ecuador</option>
                                  <option value="eg">Egypt</option>
                                  <option value="sv">El Salvador</option>
                                  <option value="gq">Equatorial Guinea</option>
                                  <option value="er">Eritrea</option>
                                  <option value="ee">Estonia</option>
                                  <option value="et">Ethiopia</option>
                                  <option value="fk">
                                    Falkland Islands (Malvinas)
                                  </option>
                                  <option value="fo">Faroe Islands</option>
                                  <option value="fm">
                                    Federated States of Micronesia
                                  </option>
                                  <option value="fj">Fiji</option>
                                  <option value="fi">Finland</option>
                                  <option value="fr">France</option>
                                  <option value="gf">French Guiana</option>
                                  <option value="pf">French Polynesia</option>
                                  <option value="tf">
                                    French Southern Territories
                                  </option>
                                  <option value="ga">Gabon</option>
                                  <option value="gm">Gambia</option>
                                  <option value="ge">Georgia</option>
                                  <option value="de">Germany</option>
                                  <option value="gh">Ghana</option>
                                  <option value="gi">Gibraltar</option>
                                  <option value="gr">Greece</option>
                                  <option value="gl">Greenland</option>
                                  <option value="gd">Grenada</option>
                                  <option value="gp">Guadeloupe</option>
                                  <option value="gu">Guam</option>
                                  <option value="gt">Guatemala</option>
                                  <option value="gg">Guernsey</option>
                                  <option value="gn">Guinea</option>
                                  <option value="gw">Guinea-Bissau</option>
                                  <option value="gy">Guyana</option>
                                  <option value="ht">Haiti</option>
                                  <option value="hm">
                                    Heard Island and McDonald Islands
                                  </option>
                                  <option value="hn">Honduras</option>
                                  <option value="hk">Hong Kong</option>
                                  <option value="hu">Hungary</option>
                                  <option value="is">Iceland</option>
                                  <option value="in">India</option>
                                  <option value="id">Indonesia</option>
                                  <option value="ir">Iran</option>
                                  <option value="iq">Iraq</option>
                                  <option value="ie">Ireland</option>
                                  <option value="im">Isle of Man</option>
                                  <option value="il">Israel</option>
                                  <option value="it">Italy</option>
                                  <option value="jm">Jamaica</option>
                                  <option value="jp">Japan</option>
                                  <option value="je">Jersey</option>
                                  <option value="jo">Jordan</option>
                                  <option value="kz">Kazakhstan</option>
                                  <option value="ke">Kenya</option>
                                  <option value="ki">Kiribati</option>
                                  <option value="kr">Korea</option>
                                  <option value="kp">Korea (North)</option>
                                  <option value="ko">Kosovo</option>
                                  <option value="kw">Kuwait</option>
                                  <option value="kg">Kyrgyzstan</option>
                                  <option value="la">Laos</option>
                                  <option value="lv">Latvia</option>
                                  <option value="lb">Lebanon</option>
                                  <option value="ls">Lesotho</option>
                                  <option value="lr">Liberia</option>
                                  <option value="ly">Libya</option>
                                  <option value="li">Liechtenstein</option>
                                  <option value="lt">Lithuania</option>
                                  <option value="lu">Luxembourg</option>
                                  <option value="mo">Macao</option>
                                  <option value="mk">Macedonia</option>
                                  <option value="mg">Madagascar</option>
                                  <option value="mw">Malawi</option>
                                  <option value="my">Malaysia</option>
                                  <option value="mv">Maldives</option>
                                  <option value="ml">Mali</option>
                                  <option value="mt">Malta</option>
                                  <option value="mh">Marshall Islands</option>
                                  <option value="mq">Martinique</option>
                                  <option value="mr">Mauritania</option>
                                  <option value="mu">Mauritius</option>
                                  <option value="yt">Mayotte</option>
                                  <option value="mx">Mexico</option>
                                  <option value="md">Moldova</option>
                                  <option value="mc">Monaco</option>
                                  <option value="mn">Mongolia</option>
                                  <option value="me">Montenegro</option>
                                  <option value="ms">Montserrat</option>
                                  <option value="ma">Morocco</option>
                                  <option value="mz">Mozambique</option>
                                  <option value="mm">Myanmar</option>
                                  <option value="na">Namibia</option>
                                  <option value="nr">Nauru</option>
                                  <option value="np">Nepal</option>
                                  <option value="nl">Netherlands</option>
                                  <option value="an">
                                    Netherlands Antilles
                                  </option>
                                  <option value="nc">New Caledonia</option>
                                  <option value="nz">New Zealand</option>
                                  <option value="ni">Nicaragua</option>
                                  <option value="ne">Niger</option>
                                  <option value="ng">Nigeria</option>
                                  <option value="nu">Niue</option>
                                  <option value="nf">Norfolk Island</option>
                                  <option value="mp">
                                    Northern Mariana Islands
                                  </option>
                                  <option value="no">Norway</option>
                                  <option value="pk">Pakistan</option>
                                  <option value="pw">Palau</option>
                                  <option value="ps">
                                    Palestinian Territory
                                  </option>
                                  <option value="pa">Panama</option>
                                  <option value="pg">Papua New Guinea</option>
                                  <option value="py">Paraguay</option>
                                  <option value="pe">Peru</option>
                                  <option value="ph">Philippines</option>
                                  <option value="pn">Pitcairn</option>
                                  <option value="pl">Poland</option>
                                  <option value="pt">Portugal</option>
                                  <option value="pr">Puerto Rico</option>
                                  <option value="qa">Qatar</option>
                                  <option value="re">Reunion</option>
                                  <option value="ro">Romania</option>
                                  <option value="ru">Russian Federation</option>
                                  <option value="rw">Rwanda</option>
                                  <option value="gs">
                                    S. Georgia and S. Sandwich Islands
                                  </option>
                                  <option value="sh">Saint Helena</option>
                                  <option value="kn">
                                    Saint Kitts and Nevis
                                  </option>
                                  <option value="lc">Saint Lucia</option>
                                  <option value="pm">
                                    Saint Pierre and Miquelon
                                  </option>
                                  <option value="vc">
                                    Saint Vincent and the Grenadines
                                  </option>
                                  <option value="ws">Samoa</option>
                                  <option value="sm">San Marino</option>
                                  <option value="st">
                                    Sao Tome and Principe
                                  </option>
                                  <option value="sa">Saudi Arabia</option>
                                  <option value="sn">Senegal</option>
                                  <option value="rs">Serbia</option>
                                  <option value="cs">
                                    Serbia and Montenegro
                                  </option>
                                  <option value="sc">Seychelles</option>
                                  <option value="sl">Sierra Leone</option>
                                  <option value="sg">Singapore</option>
                                  <option value="sk">Slovak Republic</option>
                                  <option value="si">Slovenia</option>
                                  <option value="sb">Solomon Islands</option>
                                  <option value="so">Somalia</option>
                                  <option value="za">South Africa</option>
                                  <option value="ss">South Sudan</option>
                                  <option value="es">Spain</option>
                                  <option value="lk">Sri Lanka</option>
                                  <option value="sd">Sudan</option>
                                  <option value="om">Sultanate of Oman</option>
                                  <option value="sr">Suriname</option>
                                  <option value="sj">
                                    Svalbard and Jan Mayen
                                  </option>
                                  <option value="sz">Swaziland</option>
                                  <option value="se">Sweden</option>
                                  <option value="ch">Switzerland</option>
                                  <option value="sy">Syria</option>
                                  <option value="tw">Taiwan</option>
                                  <option value="tj">Tajikistan</option>
                                  <option value="tz">Tanzania</option>
                                  <option value="th">Thailand</option>
                                  <option value="tl">Timor-Leste</option>
                                  <option value="tg">Togo</option>
                                  <option value="tk">Tokelau</option>
                                  <option value="to">Tonga</option>
                                  <option value="tt">
                                    Trinidad and Tobago
                                  </option>
                                  <option value="tn">Tunisia</option>
                                  <option value="tr">Turkey</option>
                                  <option value="tm">Turkmenistan</option>
                                  <option value="tc">
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="tv">Tuvalu</option>
                                  <option value="ug">Uganda</option>
                                  <option value="ua">Ukraine</option>
                                  <option value="ae">
                                    United Arab Emirates
                                  </option>
                                  <option value="gb">United Kingdom</option>
                                  <option value="uy">Uruguay</option>
                                  <option value="uz">Uzbekistan</option>
                                  <option value="vu">Vanuatu</option>
                                  <option value="va">
                                    Vatican City State (Holy See)
                                  </option>
                                  <option value="ve">Venezuela</option>
                                  <option value="vn">Vietnam</option>
                                  <option value="vg">
                                    Virgin Islands (British)
                                  </option>
                                  <option value="vi">
                                    Virgin Islands (U.S.)
                                  </option>
                                  <option value="wf">Wallis and Futuna</option>
                                  <option value="eh">Western Sahara</option>
                                  <option value="ye">Yemen</option>
                                  <option value="zm">Zambia</option>
                                  <option value="zw">Zimbabwe</option>
                                  <option value="oo">Other</option>
                                </select>
                                <div
                                  id="ember296"
                                  class="onboarding-profile-error-container ember-view"
                                />
                              </div>
                            </div>

                            <div id="ember297" class="ember-view">
                              <div
                                id="ember298"
                                class="onboarding-profile-form-field onboarding-profile-location__field-container pt3 pb2 ember-view"
                              >
                                <label
                                  class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate "
                                  for="location-postal"
                                >
                                  City
                                </label>

                                <input
                                  maxlength="10"
                                  class="onboarding-input onboarding-profile-location__postal-field ember-text-field ember-view"
                                  type="text"
                                  placeholder="City"
                                  onChange={this.cityChangeHandler}
                                />

                                <div
                                  id="ember300"
                                  class="onboarding-profile-error-container ember-view"
                                />
                              </div>
                            </div>

                            <div id="ember297" class="ember-view">
                              <div
                                id="ember298"
                                class="onboarding-profile-form-field onboarding-profile-location__field-container pt3 pb2 ember-view"
                              >
                                <label
                                  class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate "
                                  for="location-postal"
                                >
                                  State
                                </label>

                                <input
                                  maxlength="10"
                                  class="onboarding-input onboarding-profile-location__postal-field ember-text-field ember-view"
                                  type="text"
                                  placeholder="State"
                                  onChange={this.stateChangeHandler}
                                />

                                <div
                                  id="ember300"
                                  class="onboarding-profile-error-container ember-view"
                                />
                              </div>
                            </div>

                            <div id="ember297" class="ember-view">
                              <div
                                id="ember298"
                                class="onboarding-profile-form-field onboarding-profile-location__field-container pt3 pb2 ember-view"
                              >
                                <label
                                  class="onboarding-profile-form-field__label t-14 t-black--light t-normal mt0 truncate "
                                  for="location-postal"
                                >
                                  Postal code
                                </label>

                                <input
                                  maxlength="10"
                                  class="onboarding-input onboarding-profile-location__postal-field ember-text-field ember-view"
                                  type="text"
                                  placeholder="Postal code"
                                  onChange={this.zipcodeChangeHandler}
                                />

                                <div
                                  id="ember300"
                                  class="onboarding-profile-error-container ember-view"
                                />
                              </div>
                            </div>

                            <footer class="mt5">
                              <button
                                data-control-name="continue"
                                id="ember301"
                                class="onboarding-widget__cta button-primary-x-large full-width ember-view"
                                onClick={this.submitLogin}
                              >
                                {" "}
                                Next
                              </button>
                            </footer>
                          </div>{" "}
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="ember302" class="ember-view" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.applicantLogin.username,
  location: state.applicantLogin.location
});

//export default PostSignUp;
export default connect(
  mapStateToProps,
  { locationData }
)(PostSignUp);
