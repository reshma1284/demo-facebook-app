import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditMessage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      successMsg: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
  //  console.log(this.props.obj._id);

    axios.post('/fb/delete',{
      messageId: this.props.obj._id
    })
    .then(function(response){
    //  console.log(response);
      this.setState({
        successMsg: response.message
      })
    })
    .catch(function(error){
      console.log(error.response);
    })

  }

  render(){
      //console.log(this.props.obj._id);
      // <Link to={{
      // pathname: '/edit',
      // state: { detail: this.props.obj }
      // }}
    return(
          <ul className="changeMsg">
            <li>
              <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </li>
            <li>
              <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="Delete" className="btn btn-danger"/>
              </form>
            </li>
          </ul>

          //{this.state.successMsg && <p>{this.state.successMsg}</p>}

  )}
}

export default EditMessage;
