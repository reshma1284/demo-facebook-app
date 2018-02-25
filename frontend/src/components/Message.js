import React from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <p> {this.props.text} </p>
    )
  }
}

export default Message;
