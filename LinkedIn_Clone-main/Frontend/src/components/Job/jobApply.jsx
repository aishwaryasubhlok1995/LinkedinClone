import React, { Component } from "react";
import "../../css/jopApplication.css";
import "../common/auth"
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getJWTUsername } from "../common/auth";
import Modal from "react-responsive-modal";
import supportingImage4 from "../../images/supportingImage4.jpg";
import supportingImage2 from "../../images/supportingImage2.png";
import { searchJob, saveJob, applyJob,getJobById } from "../../actions/jobActions";
import Home from './jobFilter'
import request from "superagent";
import Dropzone from "react-dropzone";

const CLOUDINARY_UPLOAD_PRESET = "g4q2o6at";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/ungcmpe273/upload";

class JobSearch extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname:"",
      lastname:"",
      state:"",
      city:"",
      email:"",
      imageNumber: 0,
      text:"",
   selectedOption:"",
   jobdetails:[],
      imageView: [],
      value:"",
      value1:"",
      value2:"",
      userdata:[],
      open: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.FirstnameChangeHandler = this.FirstnameChangeHandler.bind(this);
    this.LastnameChangeHandler = this.LastnameChangeHandler.bind(this);
    this.EmailChangeHandler=this.EmailChangeHandler.bind(this);
    this.StateChangeHandler=this.StateChangeHandler.bind(this);
    this.TextChangeHandler=this.TextChangeHandler.bind(this);
    this.CityChangeHandler=this.CityChangeHandler.bind(this);
       this.Submit=this.Submit.bind(this);
  
  }
  state = { uploadedFile: null };
  handleResumeUpload(file) {
    console.log("file=", file);
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        // save to db
        console.log("url=", response.body.secure_url);
        this.setState({
          url:response.body.secure_url
        })
      }
    });
  }

  onResumeDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleResumeUpload(files[0]);
  };

  

  
FirstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  LastnameChangeHandler= e => {
    this.setState({
     lastname:e.target.value
    });
  };
  EmailChangeHandler= e => {
    this.setState({
      email:e.target.value
    });
  };
  StateChangeHandler= e => {
    this.setState({
     state:e.target.value
    });
  };
  CityChangeHandler= e => {
    this.setState({
      city: e.target.value
    });
  };
  TextChangeHandler= e => {
    this.setState({
      text: e.target.value
    });
  };
 
  handleChange(event) {
        
    this.setState({value: event.target.value});
}
handleChange1(event) {
        
  this.setState({value1: event.target.value});
}
handleChange2(event) {
        
  this.setState({value2: event.target.value});
}
  componentDidMount(){
    // const foo =this.props.location.state;
    // console.log("Foo",foo);
    const data={
      username:getJWTUsername()
    }
    var properties1 = this.props.search_job_results;
    console.log("IDDDD:",properties1);
    console.log(this.props.match.params.id);
this.props.getJobById(this.props.match.params.id);
  
    const res =  axios
    .post("http://localhost:3001/getuserdata", data)
    .then(response => {
      console.log("Updated List", response.data.updatedList);
      this.setState({
        userdata: response.data.updatedList,
   
      });
    });
  
  

  }

  Submit=e=>{
    const data={
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      state:this.state.state,
      city:this.state.city,
      url:this.state.url,
      pointOfInformation:this.state.text,
      disabilityquestion:this.state.value,
      diversityquestion1:this.state.value1,
      diversityquestion2:this.state.value2,
      timestamp:new Date(),
      userid:getJWTUsername(),
      jobid:this.props.match.params.id

    }
    console.log(data);
    this.props.applyJob(data,()=>{
      alert("Applied for job");
      window.location.href="/job-applied"
      });
    
  }
  render() {
 
console.log(this.props.job_edit ? this.props.job_edit[0] :"abc");
var edit=this.props ? this.props.job_edit :""
console.log(edit);
    return (
      <div class="menu">
        <div class="extendmenu row">
          <div class="icon">
          <a href="/home" > <i class="fa fa-linkedin-square" /></a>
          </div>
          <h5 style={{"color":"white"}}>   Linkedin Apply</h5>
     </div>
    <div style={{"background-color": "#5c6f7c"}}>
     <div class="alignment">
          <div class="row" >
            <div class="col-1">
              <img
                src={this.props.job_edit ? this.props.job_edit[0] ? this.props.job_edit[0].logo : "" :""}
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            <div
              class="col-6"
              style={{"paddingLeft":"5%", "padding-top": "10px" }}
            >
              <li class="blue">
                <a target="_blank">
                  <Link to="/Detail"></Link>
                </a>
              </li>
              <br />
              {this.props.job_edit ? this.props.job_edit[0] ? this.props.job_edit[0].title : "" :""}
              <br />
              {this.props.job_edit ? this.props.job_edit[0] ? this.props.job_edit[0].company : "" :""}
              <br />
              {this.props.job_edit ? this.props.job_edit[0] ? this.props.job_edit[0].location : "" :""}
              </div>
              </div>
     </div>
     
     </div>
     <div class="alignment" style={{"padding-top":"2vw"}}> Linkedin Profile</div>
     <div>
        
     <div class="row alignment" style={{"padding-top":"2vw"}}>
     
     <br></br>
                <div>
                   <img src={this.state.userdata.photo} style={{"border-radius":"50%", "width":"6vw","height":"4vw"}} />{" "}
                </div>
                <div class="col-4">
                  {this.state.userdata.firstname}<br />
                  Student <br />
                  San Jose
                </div>
              </div>
    <div class="alignment">
    First Name:  <div col="col-2" class="inputfield1 ">
          
          <input
            style={{"background-color": "#e1e9ee","font-size":"0.8rem"}}
            type="text"
            placeholder="Search"
            onChange={this.FirstnameChangeHandler}
          />
          </div>
    Last Name:
    <div col="col-2" class="inputfield1 ">
          
          <input
            style={{"background-color": "#e1e9ee","font-size":"0.8rem"}}
            type="text"
            placeholder="Search"
            onChange={this.LastnameChangeHandler}
          />
          </div>
    Email:
    <div col="col-2" class="inputfield1 ">
          
          <input
            style={{"background-color": "#e1e9ee","font-size":"0.8rem"}}
            type="text"
            placeholder="Search"
            onChange={this.EmailChangeHandler
            }
          />
          </div>
    State:
    <div col="col-2" class="inputfield1 ">
          
          <input
            style={{"background-color": "#e1e9ee","font-size":"0.8rem"}}
            type="text"
            placeholder="Search"
            onChange={this.StateChangeHandler}
          />
          </div>
    City:
    <div col="col-2" class="inputfield1 ">
          
          <input
            style={{"background-color": "#e1e9ee","font-size":"0.8rem"}}
            type="text"
            placeholder="Search"
            onChange={this.CityChangeHandler}
          />
          </div>
         
    Upload Your Resume:
<br></br>
<Dropzone
                    className="dropzone"
                    multiple={false}
                    onDrop={this.onResumeDrop.bind(this)}
                  >
                    <p>Drop a resume or click to select a file to upload.</p>
                  </Dropzone>
          <br></br>
          <br></br>
    How did your hear about us:
    <div col="col-2" class="inputfield ">
          
          <input
            style={{"background-color": "#e1e9ee", "width":"35vw","height":"5vw"}}
            type="textarea"
            placeholder="Search"
            onChange={this.TextChangeHandler}
          />
          </div>
<br></br>
<br>
</br>
<br></br>
    Disability Question:
    <br/>
    <div class="form-group floating-label not-empty">
                                        <placeholder>Are you Disable?</placeholder>
                                            <div class="FormSelect__wrapper">
                                                <select value={this.state.value} onChange={this.handleChange} aria-label="Property type" name="propertyType" class="form-control FormSelect__select" style={{"width":"50%"}}>
                                                    <option value=""></option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">NO</option>
                                                
                                                    <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                                                    </select>
                                                </div>
                                            </div>
                                        
    <br/>
    Diversity  and  Sponsership Questions
    <br/>
    <div>
        
        <br></br>
        <div class="form-group floating-label not-empty">
                                        <placeholder>Are you legally authorized to work in the united states?</placeholder>
                                            <div class="FormSelect__wrapper">
                                                <select value={this.state.value1} onChange={this.handleChange1} aria-label="Property type" name="propertyType" class="form-control FormSelect__select" style={{"width":"50%"}}>
                                                    <option value=""></option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">NO</option>
                                                
                                                    <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                                                    </select>
                                                </div>
                                            </div>

        <br></br>
        <div class="form-group floating-label not-empty">
                                        <placeholder> Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)? </placeholder>
                                            <div class="FormSelect__wrapper">
                                                <select value={this.state.value2} onChange={this.handleChange2} aria-label="Property type" name="propertyType" class="form-control FormSelect__select" style={{"width":"50%"}}>
                                                    <option value=""></option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">NO</option>
                                                
                                                    <i aria-hidden="true" class="icon-chevron-down FormSelect__chevron"></i>
                                                    </select>
                                                </div>
                                            </div>
    </div>
    <br/>
    <div class="alignment">
    <button class="Button" onClick={this.Submit}>
            Submit Application
          </button>
    </div>
    </div>
         </div>
    </div>
    );
  }
}
const mapStateToProps = state => ({
  search_job_results: state.jobReducer.search_job_results,
  view: state.jobReducer.updatedList,
  job_edit:state.jobReducer.job_edit
});

export default connect(
  mapStateToProps,
  { searchJob, saveJob, applyJob,getJobById }
)(JobSearch);
