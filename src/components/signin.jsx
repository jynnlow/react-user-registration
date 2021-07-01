import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = { 
    user:{
        username: '' , 
        password: ''
      }
   }

  handleChange = (e) => {
    var user = this.state.user;
    if (e.target.name === 'username'){
      user.username = e.target.value;
    }
    if(e.target.name === 'password'){
      user.password = e.target.value;
    }
    this.setState({user})
  }

  handleSignin = async () =>{
    try{
      console.log(this.state.user)
      const res = await axios.post('http://localhost:8080/users/login',this.state.user)
      localStorage.setItem('token',res.data.Message)
      if (res.data.Status === "SUCCESS"){
        window.location = 'http://localhost:3000/';
      }
    }catch(err){
      console.log(err)
    }
  }

  render() { 
    const { username, password } = this.state.user;
    return ( 
      <div className="container-fluid mt-5">
        <div className="container">
          <p className="h5 mb-4">Welcome! Please sign in to enter admin darshboard.</p>
          <div className="row mb-4">
            <div className="col-3">
              <label className="col-form-label">Username</label>
            </div>
            <div className="col-6">
              <input 
                type="text" 
                name="username" 
                className="form-control" 
                value={username} 
                onChange={this.handleChange.bind(this)}>
              </input>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label className="col-form-label">Password</label>
            </div>
            <div className="col-6">
              <input 
                type="password" 
                name="password"
                className="form-control" 
                value={password} 
                onChange={this.handleChange.bind(this)}>
              </input>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button 
              type="submit" 
              className="btn-style" 
              onClick={this.handleSignin}>Sign In
            </button>
          </div>
        </div>
      </div>
     );
  }
}
export default Signin;