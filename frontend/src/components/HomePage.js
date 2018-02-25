import React from 'react';
import Register from './Register';
import Login from './Login';

class HomePage extends React.Component{
  render(){
    return(
        <div className="container">
            <h1 id="welcome"> Welcome to Facebook </h1> <br />
            <Register />
            <Login />
        </div>
    )
  }
}

export default HomePage;
