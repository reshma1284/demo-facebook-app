import React from 'react';
import axios from 'axios';


class EditPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('/fb/update/'+ this.props.match.params.id , {
      message: this.state.value
    })
    .then(function(response){
    //  console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })

  }

  handleInputChange(event){
    this.setState({
      value : event.target.value
    })
  }

  componentDidMount(){
    let _this = this;

    axios.get('/fb/getItemForEdit/' + this.props.match.params.id)
    .then(function(response){
    //  console.log(response.data.message);
      _this.setState({
        value: response.data.message
      })
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render(){
      //console.log(this.props.obj._id);
    return(
      <div className="container">
        <ul className="headerList">
          <li> Timeline </li>
          <li> Welcome </li>
          <li> Log Off </li>
        </ul>

        <h4> Post a Message </h4>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" id="timelineTextarea" rows={3}
            name="message" value={this.state.value} onChange={this.handleInputChange}  />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )}
}

export default EditPage;
