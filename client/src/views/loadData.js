// import { extent, scaleLinear } from 'd3';
import _, { result } from 'lodash';
import StackedBarChart from './StackedBarChart';

export function parseBioData(data) {
  var data = data.map(function (el) {
    var o = Object.assign({}, el);

    return o;
  });
}

export function parseTreeNav(data) {
  var data = data.map(function (el) {
    var o = Object.assign({}, el);

    return o;
  });

  var grouped = _.groupBy(data, 'Type');

  let reformattedArray = Object.keys(grouped).map(function (key, value) {
    let rObj = {};
    rObj['key'] = key;
    rObj['label'] = key;
    var smallGroups = _.groupBy(grouped[key], 'Form Name');
    var subArray = Object.keys(smallGroups).map(function (key, value) {
      let nObj = {};
      nObj['key'] = key;
      nObj['label'] = key;

      var sectionGroups = _.groupBy(smallGroups[key], 'Section Header');

      var subSectionArray = Object.keys(sectionGroups).map(function (
        key,
        value
      ) {
        let sObj = {};
        sObj['key'] = key;
        sObj['label'] = key;
        // nObj['Description'] = smallGroups[key]['Field Label'];
        sObj['props'] = sectionGroups[key];

        var analyteGroups = _.groupBy(sectionGroups[key], 'VisitID');
        if (
          Object.keys(analyteGroups) == '' ||
          Object.keys(analyteGroups) == 'undefined'
        ) {
          return sObj;
        }
        // return sObj;

        var analyteArray = Object.keys(analyteGroups).map(function (
          key,
          value
        ) {
          let aObj = {};
          aObj['key'] = key;
          aObj['label'] = key;
          aObj['props'] = analyteGroups[key];
          return aObj;
        });

        sObj['nodes'] = analyteArray;

        return sObj;
      });

      nObj['nodes'] = subSectionArray;

      return nObj;
    });
    rObj['nodes'] = subArray;

    return rObj;
  });

  var modData = reformattedArray;
  if (
    modData.length >= 1 &&
    modData[modData.length - 1]['key'] == 'undefined'
  ) {
    modData.pop();
  }
  // if (modData[modData.length - 1])
  return modData;
}

export function parseSmallTable(data) {
  var grouped = _.groupBy(data, 'Type');

  let reformattedArray = Object.keys(grouped).map(function (key, value) {
    let rObj = {};
    rObj['key'] = key;
    rObj['label'] = key;
    var smallGroups = _.groupBy(grouped[key], 'Form Name');

    var subArray = Object.keys(smallGroups).map(function (key, value) {
      let nObj = {};
      nObj['key'] = key;
      nObj['label'] = key;
      // nObj['Description'] = smallGroups[key]['Field Label'];
      nObj['props'] = smallGroups[key];

      return nObj;
    });
    rObj['nodes'] = subArray;

    return rObj;
  });

  var modData = reformattedArray;

  return modData;
}

export function addAditionalData(data) {
  var result = data.map(function (el) {
    var o = Object.assign({}, el);
    o.updated = '11/11/2021';
    o.nullValues = Math.random() * 1400;
    o.filledValues = 1400 - o.nullValues;
    return o;
  });

  return result;
  // return modData;
}

// export function loadTree() {
//   return fetch(
//     `${process.env.PUBLIC_URL}/data/BiggerProtectDictionaryTwo.csv`
//   ).then((response) => response.text());
// }

// export function loadData() {
//   return fetch(
//     `${process.env.PUBLIC_URL}/data/BiggerProtectDictionaryTwo.csv`
//   ).then((response) => response.text());
// }

export function updateTableInfo(props) {
  var tableData = props.props;

  // this.setState({ tableData: tableData });
}
export const data = [
  {
    'Variable / Field Name': 'Beetlejuice',
    // year: '1988',
  },
];
export function getCorrectData(smallTable, selectedSmallNav) {
  var newData = null;
  if (selectedSmallNav === null) {
    return [];
  }

  newData = smallTable.filter((obj) => {
    return (
      obj['Form Name'] == selectedSmallNav[0] &&
      obj['Section Header'] == selectedSmallNav[1]
    );
  });

  return newData;
}
