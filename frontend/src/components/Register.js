import React from 'react';
import axios from 'axios';
import Message from './Message';

class Register extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      frmData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: ''
      },
      msg: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: ''
      },
      success: ''
      // regSuccess: null,
      // nameValidErr: null,
      // emailValidErr1: null,
      // pswValidErr: null,
      // emailValidErr2: null,
      // countryValidErr: null,
      // validError: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleSubmit(event){
  event.preventDefault();
  this.setState({
    success: ''
  });
  let _this = this;

  axios.post('/fb/register', this.state.frmData)
  .then(function(response){
    //console.log(response);
    _this.setState({
      msg: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: ''
      },
      success: <Message text="Thanks for your Registration" />
    });
  })
  .catch(function(error){
    console.log(error);
    if(error.response) {
      let mainErrors = error.response.data.errors,
      msg = {
          name: mainErrors.name ? mainErrors.name.msg : '',
          email: mainErrors.email ? mainErrors.email.msg : '',
          password: mainErrors.password ? mainErrors.password.msg : '',
          confirmPassword: mainErrors.confirmPassword ? mainErrors.confirmPassword.msg : '',
          gender: mainErrors.gender ? mainErrors.gender.msg : '',
          country: mainErrors.country ? mainErrors.country.msg : ''
      };
      this.setState({
        msg: msg
      });
    }
  }.bind(this));
}

  handleInputChange(event){
    var temp = this.state.frmData;
    temp[event.target.name] = event.target.value
    this.setState({
      frmData:  temp
    })
  }


  render(){

    return(
        <div id="register-details">
          <h1> Register </h1>

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputName"> Name </label>
                  <input onChange={this.handleInputChange} type="text" value={this.state.name}  className="form-control" id="InputName" aria-describedby="emailHelp"
                      name="name"   placeholder="Enter Name" />
                  <span className="text-danger"> {this.state.msg.name} </span>
                </div>

                 <div className="form-group">
                   <label htmlFor="RegInputEmail1">Email address</label>
                   <input onChange={this.handleInputChange} type="email"  value={this.state.email} className="form-control" id="RegInputEmail1" aria-describedby="emailHelp"
                      name="email" placeholder="Enter email" />
                      <span className="text-danger"> {this.state.msg.email} </span>
                 </div>

                 <div className="form-group">
                   <label htmlFor="RegInputPassword1">Password</label>
                   <input type="password"  value={this.state.password} onChange={this.handleInputChange} className="form-control" id="RegInputPassword1"
                      name="password" placeholder="Password" />
                    <span className="text-danger"> {this.state.msg.password} </span>
                 </div>

                 <div className="form-group">
                   <label htmlFor="RegInputPassword2">Confirm Password</label>
                   <input type="password"  value={this.state.confirmPassword} onChange={this.handleInputChange} className="form-control" id="RegInputPassword2"
                        name="confirmPassword" placeholder="Password" />
                    <span className="text-danger"> {this.state.msg.confirmPassword} </span>
                 </div>

                 <div className="form-group">
                   <label> Select Gender </label>
                   <div className="radio form-check-inline">
                     <label><input type="radio"  value="Male" onChange={this.handleInputChange} name="gender" />Male</label>
                   </div>
                   <div className="radio form-check-inline">
                     <label><input type="radio"  value="Female" onChange={this.handleInputChange} name="gender" />Female</label>
                   </div>
                 </div>

                 <div className="form-group">
                   <label htmlFor="inputCountry"> Country </label>
                   <input type="text" value={this.state.country} onChange={this.handleInputChange} className="form-control" id="InputCountry" aria-describedby="emailHelp"
                       name="country"   placeholder="Enter Country" />
                  <span className="text-danger"> {this.state.msg.country} </span>
                 </div>

                 <button type="submit" className="btn btn-primary">Submit</button>

                 {this.state.regSuccess &&
                  <p className="successMsg"> Registration done successfully </p>
                  }
            </form>

            {this.state.validError &&
              <ul>
                <li className="errorMsg"> {this.state.nameValidErr} </li>
                <li className="errorMsg"> {this.state.emailValidErr1} </li>
                <li className="errorMsg"> {this.state.emailValidErr2} </li>
                <li className="errorMsg"> {this.state.pswValidErr} </li>
                <li className="errorMsg"> {this.state.countryValidErr} </li>
              </ul>
             }

        </div>
    )
  }

}

export default Register;
