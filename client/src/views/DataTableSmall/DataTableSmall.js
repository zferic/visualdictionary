import React, { useMemo, useState, useEffect } from 'react';
import _ from 'lodash';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import CheckBox from '../../Components/Menu/CheckBox';
import DataTable from 'react-data-table-component';
import { MyCheckBox } from '../../Components/Menu/style';
import Button from '../../Components/Menu/Button';
import { parseTreeNav } from '../loadData';
import RequestDataForm from '../RequestDataForm';
import UpsetDataButton from '../../Components/TableButton/UpsetDataButton';
import Card from '@mui/material/Card';
import DeselectButton from '../../Components/TableButton/DeselectButton';
import RequestButton from '../../Components/TableButton/RequestButton';
import Checkbox from '@mui/material/Checkbox';

// import setDatabaseData from '../../index';

const columns = [
  {
    name: 'Variable Id',
    selector: (row) => row['Variable / Field Name'],
    wrap: true,
  },
  {
    name: 'Description',
    selector: (row) => row['Field Label'],
    wrap: true,
  },
  {
    name: 'Choices',
    selector: (row) => row['Choices Calculations OR Slider Labels'],
    wrap: true,
  },
];

function DataTableSmall(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [upsetArray, setUpsetArray] = React.useState([]);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // setSelectedRows([]);

  // const [seeView, setSeeView] = useState(false);
  function findDifference() {
    let differenceArray = [];
    let rowsSmallTable = upsetArray;
    let rowsSmallTableData = props.smallTableData;

    for (let i = 0; i < rowsSmallTable.length; i++) {
      for (let j = 0; j < rowsSmallTableData.length; j++) {
        if (
          rowsSmallTable[i]['Type'] === rowsSmallTableData[j]['Type'] &&
          rowsSmallTable[i]['Variable / Field Name'] ===
            rowsSmallTableData[j]['Variable / Field Name'] &&
          rowsSmallTable[i]['Form Name'] ===
            rowsSmallTableData[j]['Form Name'] &&
          rowsSmallTable[i]['VisitID'] === rowsSmallTableData[j]['VisitID']
        ) {
          differenceArray.push(rowsSmallTableData[j]);
        }
      }
    }

    return _.differenceBy(rowsSmallTableData, differenceArray);
  }

  const handleChange = (state) => {
    if (props.clearSelectedRows == true) {
      setUpsetArray([]);
    }
    props.setDataToSee(upsetArray);

    if (state.selectedRows.length == 0) {
      upsetArray.pop();
    } else {
      if (upsetArray.indexOf(state.selectedRows[0]) == -1) {
        upsetArray.push(state.selectedRows[0]);
        // upsetArray.push(state.selectedRows[0]);
      }
    }
    props.setChangeText(!props.changeText);
    props.setClearSelectedRows(false);

    setSelectedRows(state.selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    if (!_.isEqual(props.smallTable, [])) {
      props.setSmallTableNav(parseTreeNav(findDifference()));
      props.setSmallTable(_.differenceBy(props.smallTable, upsetArray));
      props.setSmallTableData(findDifference());
    }

    // props.setSmallTable(selectedRows);

    setToggleClearRows(!toggledClearRows);
  };

  const upsetData = () => {
    var urlString = '';

    if (upsetArray == []) {
      return;
    }
    console.log(upsetArray)
    for (let i of upsetArray) {
      urlString =
        urlString +
        i['Variable / Field Name'] +
        ',' +
        i['Form Name'] +
        ',' +
        i['VisitIDNum'] +
        ',' +
        i['Section Header'] +
        'xxx';
    }

    fetch('https://manati.ece.neu.edu/vizquery/sdss/upsetData/' + urlString)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let intersectionData = data[1];
        let setData = data[0];
        for (let inter of intersectionData) {
          let interName = inter.name;
          const set1 = new Set();
          inter.sets = set1;
          for (let s of setData) {
            if (interName.includes(s.name)) {
              inter.sets.add(s);
            }
          }
        }

        let newData = [setData, intersectionData];

        props.setDatabaseData(newData);
        props.setHideUpset(true);
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const subHeaderComponent = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '56px',
        paddingBottom: 20,
        marginBottom: 25,
        borderBottom: '1px solid #e6e6e6',
        width: '100%',
      }}
    >
      <p style={{ fontSize: '30px', margin: '0 0 0 10px', padding: 0 }}>
        {' '}
        {props.smallTableData.length == 0 ? '' : props.selectedNav[1]}
      </p>
      <div style={{ marginRight: 10 }}>
        <DeselectButton
          buttonLabel={'Deselect'}
          onClickHandler={handleClearRows}
        />
        <UpsetDataButton
          buttonLabel={'Merge Completeness'}
          onClickHandler={upsetData}
        />
        <RequestButton
          buttonLabel={'Request Data'}
          onClickHandler={togglePopup}
        />
      </div>
    </div>
  );

  const customStyles = {
    rows: {
      style: {
        paddingTop: '5px',
        paddingBottom: '5px',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f5f8fe',
        fontSize: '14px',
        minHeight: '56px',
      },
    },
    subHeader: {
      style: {
        margin: 0,
        padding: 0,
      },
    },
  };

  return (
    <div
      style={{
        height: 'auto',
        marginLeft: '2px',
        padding: '25px 20px 25px 20px',
        backgroundColor: '#f3f6f9',
        boxShadow: '-5px -6px 8px 0 #DBDBDB',
      }}
    >
      <Card style={{ height: '100%', padding: 20 }}>
        {isOpen && (
          <RequestDataForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClose={togglePopup}
            smallTableData={props.smallTableData}
          />
        )}
        <DataTable
          columns={columns}
          data={props.smallTable}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          subHeaderComponent={subHeaderComponent}
          subHeader={true}
          striped={true}
          selectableRowsNoSelectAll={true}
          selectableRowsComponent={Checkbox}
          customStyles={customStyles}
          selectableRowsSingle={true}
        />
      </Card>
    </div>
  );
}
export default DataTableSmall;
