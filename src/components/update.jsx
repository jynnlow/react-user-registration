import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


class Update extends Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    showModal: false,
  }

   handleUpdate = () =>{
     const {username, password} = this.state.user
     this.props.handleUpdate(this.props.selectedId[0], username, password)
   }

  handleModal = (handle) => {
    this.setState({showModal: handle})
  }

  render() {  
    return ( 
      <div>
        <button onClick= {() => this.handleModal(true)} className="btn btn-warning" disabled={this.props.disabledBtn}> Update</button>
        <React.Fragment>
          <SweetAlert
            show={this.state.showModal}
            title={"Update User"}
            type={'controlled'}
            dependencies={[this.state.user.username, this.state.user.password]}
            onConfirm={this.handleUpdate}
            onCancel={() => this.handleModal(false)}
            closeOnClickOutside
            confirmBtnBsStyle={'primary'}
            confirmBtnText={'Confirm'}
            showCloseButton
          >
            {
              (renderModal) => (
                <form>
                  User's ID: #{this.props.selectedId[0]}
                  <hr/>
                 <input
                  type={'text'}
                  ref={renderModal.setAutoFocusInputRef}
                  className='form-control'
                  value={this.state.user.username}
                  onKeyDown={renderModal.onEnterKeyDownConfirm}
                  onChange={(e) => this.setState({user: {username: e.target.value}})}
                  placeholder={'Username'}
                 />
                 <br />
                 <input
                  type={'text'}
                  className='form-control'
                  value={this.state.user.password}
                  onKeyDown={renderModal.onEnterKeyDownConfirm}
                  onChange={(e) => this.setState({user: {password: e.target.value}})}
                  placeholder={'Password'}
                 />
                 <hr/>
                </form>
              )
            }
          </SweetAlert>
        </React.Fragment>
      </div>
     );
  }
}
 
export default Update;