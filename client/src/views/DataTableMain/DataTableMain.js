import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  contextActions,
} from 'react';
import TreeMenu, {
  defaultChildren,
  ItemComponent,
} from 'react-simple-tree-menu';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import CheckBox from '../../Components/Menu/CheckBox';
import DataTable from 'react-data-table-component';
import { MyCheckBox } from '../../Components/Menu/style';
import { parseTreeNav } from '../loadData';
import _ from 'lodash';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Histogram from '../Histogram';
import './../style.css';
import SelectButton from '../../Components/TableButton/SelectButton';
import ExportButton from '../../Components/TableButton/ExportButton';

// const DataTableMain = ({ data, smallTableUpdate }) => {

//   return <DataTable columns={columns} data={data} selectableRows />;
// };
// const rowSelectCritera = (row) => props.smallTableData;

const columns = [
  {
    name: 'Variable Id',
    selector: (row) => row['Variable / Field Name'],
    wrap: true,
    right: true,
  },
  {
    name: 'Description',
    selector: (row) => row['Field Label'],
    wrap: true,
  },
  {
    name: 'Data Type',
    selector: (row) => row['Field Type'],
    wrap: true,
  },
  {
    name: 'Choices',
    selector: (row) => row['Choices Calculations OR Slider Labels'],
    wrap: true,
  },
  {
    name: 'Notes',
    selector: (row) => row['Field Note'],
    wrap: true,
  },
];
var dataKeys = {
  'Variable / Field Name': 'screen_bottom',
  'Form Name': 'wellsite_data',
  'Section Header': 'wellsite_data',
  'Field Type': 'text',
  'Field Label':
    'Elevation of bottom of (lowermost) screen, or elevation of bottom of open borehole',
  'Choices Calculations OR Slider Labels': '',
  'Field Note': '',
  'Text Validation Type OR Show Slider Number': 'decimal',
  'Text Validation Min': '-9999',
  'Text Validation Max': '2000',
  'Identifier?': '',
  'Branching Logic (Show field only if...)': '',
  'Required Field?': '',
  'Custom Alignment': '',
  'Question Number (surveys only)': '',
  'Matrix Group Name': '',
  'Matrix Ranking?': '',
  'Field Annotation': '',
};
const rowSelectCritera = (row) => row['Variable / Field Name'] === '';

function DataTableMain(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(props.tableData);
  const [showHistogram, setShowHistogram] = React.useState(false);
  const [showComplete, setShowComplete] = React.useState(false);

  // const [rowSelectCritera, setRowSelectCriteria] = useState([]);

  // function handleChange(updateTarget) {
  //   props.setSmallTableData(updateTarget.selectedRows);
  //   props.setSmallTableNav(parseTreeNav(updateTarget.selectedRows));
  // }

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';

    const keys = Object.keys(dataKeys);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        // eslint-disable-next-line no-plusplus
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV() {
    const array = props.tableData;
    const link = document.createElement('a');

    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    const [singleData, setSingleData] = useState({
      count: 0,
      totalNumbers: 2269,
      xArray: [[null, null, null]],
      lastUpdated: 'No data',
    });

    const getData = (data) => {
      if (data['Type'] == 'Biological Data') {
        setShowComplete(true);
        setShowHistogram(false);
      }
      if (data['Type'] == 'Environmental Data') {
        setShowComplete(false);
        setShowHistogram(false);
      }

      if (data['Type'] == 'Human Subject Data') {
        setShowComplete(true);
        setShowHistogram(true);
      }
      var urlString = '';

      urlString =
        urlString +
        data['Variable / Field Name'] +
        ',' +
        data['Form Name'] +
        ',' +
        data['Type'] +
        ',' +
        data['VisitIDNum'] +
        ',' +
        data['Section Header'];

      try {
        fetch('https://manati.ece.neu.edu/vizquery/sdss/singleData/' + urlString)
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              return response.json();
            } else {
              throw Error(response.statusText);
            }
          })
          .then((data) => {
            setSingleData(data);
          });
      } catch (err) {
        if (singleData['xArray'] == []) {
          setShowHistogram(false);
        }
        console.log(err);
      }
    };

    useEffect(() => {
      getData(data);
    }, []);

    return (
      <div>
        <div>Last updated = {singleData['lastUpdated']}</div>
        {showHistogram ? (
          <div>
            <div>Distribution</div>
            <Histogram data={singleData['xArray']}></Histogram>
          </div>
        ) : null}
        {/* <div>Distribution</div>
        <Histogram data={singleData['xArray']}></Histogram> */}
        {showComplete ? (
          <div>
            {' '}
            <p>
              Total Records {singleData['count']}/{singleData['totalNumbers']}
            </p>
            <progress
              max={singleData['totalNumbers']}
              value={singleData['count']}
              style={{ width: 100 }}
            />
          </div>
        ) : null}
      </div>
    );
    // return <progress max={1400} value={getData(data)} style={{ width: 50 }} />;
  };
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleClearRows = () => {
    props.setTableData(_.difference(props.tableData, selectedRows));
    props.setSmallTableData(selectedRows);
    props.setSmallTableNav(parseTreeNav(selectedRows));
    props.setClearSelectedRows(true);
    // props.setSmallTable(selectedRows);

    // setToggleClearRows(!toggledClearRows);
  };
  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(props.data)} />,
  //   [props.data]
  // );
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
        {props.tableData.length == 0 ? '' : props.selectedMainNav[1]}
      </p>
      <div style={{ marginRight: 10 }}>
        <SelectButton buttonLabel={'Select'} onClickHandler={handleClearRows} />
        <ExportButton buttonLabel={'Export'} onClickHandler={downloadCSV} />
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
        <DataTable
          columns={columns}
          data={_.differenceBy(props.tableData, props.smallTableData)}
          // smallTable={smallUpdate}s
          // title={props.tableData.length == 0 ? '' : props.selectedMainNav[1]}
          selectableRows
          // onSelectedRowsChange={handleChange}
          // actions={actionsMemo}
          noContextMenu={true}
          striped={true}
          selectableRowsComponent={Checkbox}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          customStyles={customStyles}
          subHeaderComponent={subHeaderComponent}
          subHeader={true}
          // contextActions={contextActions}
          // selectableRowSelected={rowSelectCritera}
          selectableRowsNoSelectAll={true}
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggleCleared}
          // selectableRowSelected={rowSelectCritera}
          // clearSelectedRows={toggledClearRows}
        />
      </Card>
    </div>
  );
}

export default DataTableMain;
