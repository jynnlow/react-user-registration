import React, { Component } from 'react';
import axios from 'axios';
import Table from './components/table';
import Delete from './components/delete';
import Update from './components/update';

class Page extends Component {
  state = {
    data: [],
    selectedRows: [],
    selectedId: [],
    disabledBtn: true,
  }

  async componentDidMount() {
    await this.fetchUsers()
  }

  fetchUsers = async() => {
    try{
      const res = await axios.get('http://localhost:8080/users',{
        headers:{
          'Authorization':'Bearer ' +  window.localStorage.getItem('token')
        }
      });
      this.setState({data: res.data});
    }catch(err){
      console.log(err)
    }
  }

  handleDelete = async(deleteObj) => {
    try{
      await axios.delete( `http://localhost:8080/users?id=${deleteObj.id}`
      ).then(
        //this.componentDidMount()
        window.location.reload()
      );
    }catch(err){
      console.log(err)
    }
  }

  handleUpdate = async(id, username, password) => {
    try{
      await axios.patch('http://localhost:8080/users', {
        id: id,
        username: username,
        password: password,
      }).then(
        window.location.reload()
      )
    }catch(err){
      console.log(err)
    }
  }

  setSelectedRows = (rows) => {
    this.setState({
      selectedRows : rows
    })
  }

  setSelectedId = (id) => {
    this.setState({
      selectedId : id
    })
  }

  setDisabledBtn = (disable) => {
    this.setState({
      disabledBtn : disable
    })
  }

  render() { 
    return ( 
      <div>
        <Table 
          data = {this.state.data}
          selectedRows = {this.state.selectedRows}
          selectedId = {this.state.selectedId}
          setSelectedRows = {this.setSelectedRows}
          setSelectedId = {this.setSelectedId}
          setDisabledBtn = {this.setDisabledBtn}
          disabledBtn = {this.state.disabledBtn}
          />
        <div className="d-flex justify-content-between ps-4 mt-5">
          <Delete
            data = {this.state.data}
            selectedId = {this.state.selectedId}
            handleDelete = {this.handleDelete}
          />
          <Update
            data = {this.state.data}
            selectedRows = {this.state.selectedRows}
            selectedId = {this.state.selectedId}
            disabledBtn = {this.state.disabledBtn}
            handleUpdate = {this.handleUpdate}
            />
        </div>
      </div>
     );
  }
}
 
export default Page;