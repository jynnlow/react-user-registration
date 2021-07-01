import React, { Component } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

class Signup extends Component {
  state = { 
    user:{
        username: '' , 
        password: ''
      },
    alert: {
      show: false,
      type: '',
      title: '',
      message: '',
    }
   }

   setAlert(type, title, message) {
    this.setState({
      alert: {
        show: true,
        type,
        title, 
        message
      }
    })
   }

   handleClose = () => {
     this.setState({alert: {show: false}})
     const user = {
      username: '' , 
      password: ''
    }
    this.setState({user})
   }

  handleChange = (e) =>{
    var user = this.state.user;
    if (e.target.name === 'username'){
      user.username = e.target.value;
    }
    if(e.target.name === 'password'){
      user.password = e.target.value;
    }
    this.setState({user})
  }

 handleSignup = async () =>{
  try{
    await axios.post('http://localhost:8080/users',this.state.user).then(res => {
      if (res.data.Status === "SUCCESS") {
        this.setAlert("success", res.data.Status, res.data.Message)
      }else{
        this.setAlert("danger", res.data.Status, res.data.Message)
      } 
    });
  }catch(err){
    console.log(err)
  }
}

  render() { 
    const { username, password } = this.state.user;
    const {show, type, title, message} = this.state.alert;
    return ( 
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-3">
              <label className="col-form-label font-color">Username</label>
            </div>
            <div className="col-6">
              <input type="text" name="username" className="form-control" value={username} onChange={this.handleChange.bind(this)}></input>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label className="col-form-label font-color">Password</label>
            </div>
            <div className="col-6">
              <input type="password" name="password" className="form-control" value={password} onChange={this.handleChange.bind(this)}></input>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn-style" onClick={this.handleSignup}>Submit</button>
          </div>
        </div>
        <React.Fragment>
        <SweetAlert
          show={show}
          type={type}
          title={title}
          onConfirm={this.handleClose}
          onCancel={this.handleClose}
          closeOnClickOutside
          confirmBtnBsStyle={type}>
          {message}
        </SweetAlert>
      </React.Fragment>
      </div>
     );
  }
}
 
export default Signup;