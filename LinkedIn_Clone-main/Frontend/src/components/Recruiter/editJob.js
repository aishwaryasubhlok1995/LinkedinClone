import React from 'react'
import { connect } from 'react-redux'
import { editJob } from "../../actions/recruiterActions";

class EditJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      industry: "",
      employmentType: "",
      location: "",
      jobFunction: "",
      company: "",
      jobId: ""
    }
  }
  componentWillMount() {
    let j = {}
    this.props.posted_jobs.forEach(job => {
      if (job.jobId == this.props.match.params.id)
        j = job
    })
    this.setState({
      title: j.title,
      description: j.description,
      industry: j.industry,
      employmentType: j.employmentType,
      location: j.location,
      jobFunction: j.jobFunction,
      company: j.company,
      jobId: j.jobId
    })
  }
  handleChange = e => {
    this.setState({
      [ e.target.name ]: e.target.value
    })
  }
  validateForm = () => {
    return this.state.title.length && this.state.description.length && this.state.industry.length && this.state.employmentType.length && this.state.location.length && this.state.jobFunction.length && this.state.company.length
  }
  onSubmit = e => {
    e.preventDefault()
    this.props.editJob(this.state)
  }
  render() {
    return (
      <div>
        <h3>Title</h3>
        <input
          type='text'
          name='title'
          onChange={ this.handleChange }
          value={ this.state.title } />
        <h3>Description</h3>
        <input
          type='text'
          name='description'
          onChange={ this.handleChange }
          value={ this.state.description } />

        <h3>Industry</h3>
        <input
          type='text'
          name='industry'
          onChange={ this.handleChange }
          value={ this.state.industry } />
        <h3>Employment Type</h3>
        <input
          type='text'
          name='employmentType'
          onChange={ this.handleChange }
          value={ this.state.employmentType } />
        <h3>Location</h3>
        <input
          type='text'
          name='location'
          onChange={ this.handleChange }
          value={ this.state.location } />
        <h3>Job Function</h3>
        <input
          type='text'
          name='jobFunction'
          onChange={ this.handleChange }
          value={ this.state.jobFunction } />
        <h3>Company</h3>
        <input
          type='text'
          name='company'
          onChange={ this.handleChange }
          value={ this.state.company } />
        <button
          type='submit'
          onClick={ this.onSubmit }
          disabled={ !this.validateForm() }
        >Save changes</button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  posted_jobs: state.recruiterReducer.posted_jobs
});

export default connect(
  mapStateToProps,
  { editJob }
)(EditJob)
