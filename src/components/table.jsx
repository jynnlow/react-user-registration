import React, {Component} from 'react';
import DataTable from 'react-data-table-component'

const customStyles = {
  rows: {
    style: {
      minHeight: '72px',
      fontSize: '16px' 
    }
  },
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
  },
  table: {
    style: {
      minHeight: '200px'
    },
  },
};

class Table extends Component {
  state = {
    columns: [
      {
        name: 'ID',
        selector: 'ID',
        sortable: true,
        grow: -1,
      },
      {
        name: 'Username',
        selector: 'Username',
        sortable: true,
        grow: 1,
      },
      {
        name: 'Hashed Password',
        selector: 'Password',
        sortable: true,
        grow: 4,
      },
    ],
  }

  handleSelection = async (state) => {
    const {setSelectedId, setSelectedRows, setDisabledBtn} = this.props
    const rows = await state.selectedRows
    setSelectedRows(rows)
    //loop each object's ID into a new array
    const id = this.props.selectedRows.map((selectedRow)=> {
      return selectedRow.ID
    })
    setSelectedId(id)
    //make button disabled if selected id is more than 1
    if (await this.props.selectedId.length === 1){
      setDisabledBtn(false)
    }else{
      setDisabledBtn(true)
    }
  };

  render() {
    return(
      <div className="table-wrapper">
        <DataTable
        columns={this.state.columns}
        data={this.props.data}
        selectableRows
        onSelectedRowsChange={this.handleSelection}
        customStyles={customStyles}
        />
      </div>
    )
  }
}
 
export default Table;