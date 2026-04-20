import React, { useEffect, useState } from 'react';
import _, { result } from 'lodash';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { BsArrowBarRight } from 'react-icons/bs';
import { Button, InputGroup } from 'react-bootstrap';
import './style.css';
import { readString } from 'react-papaparse';
import MenuPanel from './menu';
import Header from './header';
import {
  getCorrectData,
  addAditionalData,
  parseSmallTable,
  parseTreeNav,
} from './loadData';
import TreeNav from './TreeNav';
import Search from './Search';
import DataTableMain from './DataTableMain/DataTableMain';
import DataTableSmall from './DataTableSmall/DataTableSmall';
import SmallTreeNav from './SmallTreeNav/SmallTreeNav';
import UpsetView from './upsetView/upsetView';
import MainDrawer from './MainDrawer/MainDrawer';
import SmallDrawer from './SmallDrawer/SmallDrawer';

const Views = (props) => {
  const [data, setData] = useState(null);
  const [treeNav, setTreeNav] = useState([]);

  const [searchData, setSearchData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedMainNav, setSelectedMainNav] = useState([]);
  const [smallTable, setSmallTable] = useState([]);
  const [smallTableNav, setSmallTableNav] = useState([]);
  const [smallTableData, setSmallTableData] = useState([]);
  const [selectedSmallNav, setSelectedSmallNav] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(true);
  const [dataToSee, setDataToSee] = useState([]);
  const [changeText, setChangeText] = useState(true);
  const [transferRows, setTransferRows] = useState([]);

  const [rowSelectCritera, setRowSelectCriteria] = useState((row) => false);
  const [databaseData, setDatabaseData] = useState([[], []]);
  const [hideUpset, setHideUpset] = useState(false);

  const loadData = async () => {
    try {
      const allPosts = await fetch(
        `${process.env.PUBLIC_URL}data/bioPlayground.csv`
      ).then((res) => res.text());
      return allPosts;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData().then((res) => {
      readString(res, {
        header: true,
        worker: true,
        complete: (results) => {
          var newData = addAditionalData(results.data);
          setTreeNav(parseTreeNav(results.data));
          setData(newData);
        },
      });
    });
  }, []);

  // const rowSelectCritera = (row) => {
  //   if (smallTableData.includes(row)) {
  //     return true;
  //   }
  // };
  //https://www.npmjs.com/package/react-reflex

  return (
    <>
      <Header />

      <ReflexContainer orientation="horizontal" windowResizeAware={true}>
        <ReflexElement size={55}></ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical" windowResizeAware={true}>
            <ReflexElement
              className="pane-content"
              maxSize="300"
              flex={0.2}
              // size={300}
            >
              <Search
                searchData={searchData}
                setSearchData={setSearchData}
                setTreeNav={setTreeNav}
                data={data}
              />

              <MainDrawer
                treeNav={treeNav}
                setTableData={setTableData}
                setSelectedMainNav={setSelectedMainNav}
              />
            </ReflexElement>

            <ReflexSplitter className="verticalSplitter" />

            <ReflexElement
              style={{ backgroundColor: '#f3f6f9' }}
              className="pane-content"
              flex={0.5}
            >
              <DataTableMain
                tableData={tableData}
                setTableData={setTableData}
                // transferRows={transferRows}
                // setTransferRows={setTransferRows}
                selectedMainNav={selectedMainNav}
                setSmallTableNav={setSmallTableNav}
                smallTableData={smallTableData}
                setSmallTableData={setSmallTableData}
                clearSelectedRows={clearSelectedRows}
                setClearSelectedRows={setClearSelectedRows}
              />
            </ReflexElement>

            <ReflexSplitter className="verticalSplitter" />
            <ReflexElement className="pane-content" flex={0.4}>
              <ReflexContainer
                orientation="horizontal"
                windowResizeAware={true}
              >
                <ReflexElement className="pane-content" flex={0.5}>
                  <ReflexContainer
                    orientation="vertical"
                    windowResizeAware={true}
                  >
                    <ReflexElement
                      className="pane-content"
                      flex={0.4}
                      maxSize="200"
                    >
                      <SmallDrawer
                        smallTableNav={smallTableNav}
                        setSmallTable={setSmallTable}
                        setSelectedSmallNav={setSelectedSmallNav}
                      />
                    </ReflexElement>
                    <ReflexSplitter className="verticalSplitter" />
                    <ReflexElement
                      style={{ backgroundColor: '#f3f6f9' }}
                      className="pane-content"
                      flex={1}
                    >
                      <DataTableSmall
                        smallTable={smallTable}
                        setSmallTable={setSmallTable}
                        tableData={tableData}
                        setTableData={setTableData}
                        selectedNav={selectedSmallNav}
                        setSmallTableNav={setSmallTableNav}
                        smallTableData={smallTableData}
                        setSmallTableData={setSmallTableData}
                        setDatabaseData={setDatabaseData}
                        setHideUpset={setHideUpset}
                        clearSelectedRows={clearSelectedRows}
                        setClearSelectedRows={setClearSelectedRows}
                        dataToSee={dataToSee}
                        setDataToSee={setDataToSee}
                        changeText={changeText}
                        setChangeText={setChangeText}
                      />
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexElement>
                <ReflexSplitter className="horizonSplitter" />
                <ReflexElement className="pane-content" flex={0.5}>
                  <UpsetView
                    databaseData={databaseData}
                    hideUpset={hideUpset}
                    dataToSee={dataToSee}
                    changeText={changeText}
                    // setDataToSee={setDataToSee}
                  ></UpsetView>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        {/* <ReflexElement className="footer" size={25}>
          <div className="pane-content">
            <p>{this.state.footMessage}</p>
          </div>
        </ReflexElement> */}
      </ReflexContainer>
    </>
  );
};

export default Views;
