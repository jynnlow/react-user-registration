import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

class Delete extends Component {
  state = {
    deleteAlert: {
      show: false,
      type: '',
      title: '',
      message: '',
      btnText:'',
    }
  }

  setDeleteAlert(type, title, message, btnText) {
    this.setState({
      deleteAlert: {
        show: true,
        type,
        title, 
        message,
        btnText,
      }
    })
   }

   handleClose = () => {
     this.setState({deleteAlert: {show: false}})
   }

  handleDelete = async() => {
    //to check if the selectedId is empty, if yes, onConfirm to close alert
    if (this.props.selectedId.length < 1) {
      this.handleClose()
    }else{
      const {handleDelete,selectedId} = this.props
      const arrID = [...selectedId]
        for (var i = 0; i < arrID.length; i++){
          await handleDelete({id:arrID[i]})
      }
    }
  }

  handleDeleteConfirmation = () =>{
    if (this.props.selectedId.length < 1){
      this.setDeleteAlert(
        'danger', 
        'Please select at least one user to delete', 
        '',
        'OK')
    }else{
      this.setDeleteAlert(
        'warning', 
        'Are you sure you want to delete the selected user(s)?', 
        'You will not be able to recover the deleted records!',
        'Confirm')
    }
  }

  render() { 
    const {show, type, title, message, btnText} = this.state.deleteAlert;

    return ( 
      <div>
        <button onClick={this.handleDeleteConfirmation} className="btn btn-danger"> Delete</button>
        <React.Fragment>
        <SweetAlert
          show={show}
          type={type}
          title={title}
          onConfirm={this.handleDelete}
          onCancel={this.handleClose}
          closeOnClickOutside
          confirmBtnBsStyle={type}
          confirmBtnText={btnText}
          showCloseButton>
          {message}
        </SweetAlert>
      </React.Fragment>
      </div>
     );
  }
}
 
export default Delete;