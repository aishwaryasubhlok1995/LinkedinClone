import React, { Component } from "react";
import Header from "../Header/head";
import "../../css/connectionList.css";
import supportingimage4 from "../../images/supportingImage4.jpg";
import supportingimage5 from "../../images/supportingImage5.png";
import { getJWTUsername } from "../common/auth";
import { searchUser } from "../../actions/applicantActions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import { If, Else } from "react-if";
import { Link } from "react-router-dom";

class SearchUser extends Component {
  sendMessage = () => {
    this.props.history.push("/messaging");
  };

  onSubmit(values) {
    var username = getJWTUsername();
    values.username = username;
    this.props.searchUser(values);
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input type="text" {...field.input} placeholder={field.label} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.searchResults);
    return (
      <div>
        <div>
          <Header />
        </div>
        <div style={{ "padding-top": "7vw" }} />
        <div class="row">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <div className="searchbar_dashboard">
              <Field
                name="userName"
                component={this.renderField}
                autoFocus
                label="Name"
              />

              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
          <div class="acceptRejectConnection">
            <div className="connectionData">
              {this.props.searchResults &&
                this.props.searchResults.map(data => (
                  <div key={data.firstname}>
                    <div class="row">
                      <div class="col-2">
                        <img
                          src={data.photo}
                          style={{
                            width: "7vw",
                            height: "7vw",
                            "border-radius": "50%"
                          }}
                        />
                      </div>

                      <div class="col-6" style={{ paddingTop: "2vw" }}>
                        <Link
                          to={{
                            pathname: "/viewprofile",
                            state: {
                              username: data.email
                            }
                          }}
                        >
                          <b>
                            {data ? data.firstname : ""}{" "}
                            {data ? data.lastname : ""}
                          </b>
                        </Link>
                        <br />
                        <div>
                          <p style={{ "font-size": "0.6rem" }}>
                            {data.jobTitle} | {data.companyName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>

          <div className="image5">
            <img
              src={supportingimage5}
              style={{ width: "25vw", height: "30vw" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.applicantLogin.searchResults
});

export default reduxForm({
  // validate,
  form: "searchForm"
})(
  connect(
    mapStateToProps,
    { searchUser }
  )(SearchUser)
);
