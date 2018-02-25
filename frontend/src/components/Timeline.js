import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditMessage from './EditMessage';


class Timeline extends React.Component{

  constructor(props){
    super(props)
    //console.log('in the props: ');
    //console.log(props);

    if(props.location.state !== undefined){
            this.state = {
                user: this.props.location.state.detail,
                message: '',
               name: this.props.location.state.detail.name,
               user_id:this.props.location.state.detail._id,
               listOfMessages: null
            }
        }
        else{
            this.state ={
                user: 'no user'
            }
        }

    // this.state = {
    //   message: '',
    //   name: this.props.location.state.detail.name,
    //   user_id:this.props.location.state.detail._id,
    //   listOfMessages: null
    // }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('/fb/postMessage',{
      message: this.state.message,
      name: this.state.name,
      userId: this.state.user_id
    })
    .then(function(response){
    //  console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
  }

  handleDeleteSubmit(){

  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogOutClick(){
    axios.get('/fb/logout', {})
    .then(function(response) {
               window.location.href = '/';
              //  console.log(response.data);
    })
    .catch(function (error) {
              console.log(error);
    });
  }

  componentDidMount(){
    let _this = this;

    axios.get('/fb/listMessage')
    .then(function(response){
      //console.log('response:' + response);
      //console.log(response.data);
        _this.setState({
          listOfMessages: response.data
        })
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render(){
    if(this.state.user === 'no user')
    {return <p>please login</p>}
    //console.log('name: ' + this.props.location.state.detail.name);
    //console.log('userid from state: ' + this.state.user_id);
    //console.log(this.state.listMessages);
    var user_id = this.state.user_id;
    //console.log('userid from var: ' + user_id);
    return(
        <div className="container">
          <ul className="headerList">
            <li> Timeline </li>
            <li> Welcome {this.state.name} </li>
            <li> <a className="btn btn-danger" onClick={this.handleLogOutClick}>Logout</a> </li>
          </ul>

          <h4> Post a Message </h4>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea className="form-control" id="timelineTextarea" rows={3}
              name="message" value={this.state.message} onChange={this.handleInputChange}  />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        {this.state.listOfMessages &&

            this.state.listOfMessages.map(function(item){
            return(
            <div className="messageStyle" key={item._id}>
              <h6>{item.name} - {item.postDate} </h6>
              <p> {item.message} </p>
                { user_id === item.userId &&
                    <EditMessage obj={item} /> }

            </div>
          )
          })
        }

      </div>
    )
  }
}

export default Timeline;
