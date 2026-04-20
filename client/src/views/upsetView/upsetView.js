import React, { useState, useRef, useMemo } from 'react';
import { extractCombinations, UpSetJS } from '@upsetjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import useResizeObserver from '../../Components/useResizeObserver';
import { height } from '@mui/system';

/**
 * Component that renders a StackedBarChart
 */

const UpsetView = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [width, setWidth] = useState(600);
  // console.log(props.databaseData[0]);
  // if (props.databaseData[0]) {
  //   setSeeView(true);
  // }
  //   console.log(props.databaseData[1][0]['sets']);
  // console.log('showInfo', showInfo);
  const showInfoDiv = () => {
    setShowInfo(!showInfo);
    if (width == 600) {
      setWidth(600);
    } else {
      setWidth(600);
    }
  };
  function printString(data) {
    var string = '';
    for (let d of data) {
      string = string + d['Section Header'] + ',' + d['VisitIDNum'] + ',';
    }
    return string;
  }

  // const imageUrl = `${process.env.PUBLIC_URL}/upsetExplanation.JPG`;
  return (
    <div>
      <div>
        This view cannot be used with the environmental data.
        <p>Data to be visualized</p>
        <p>{printString(props.dataToSee)}</p>
        {/* <FontAwesomeIcon
          className="info-button"
          icon={faInfoCircle}
          onClick={showInfoDiv}
        /> */}
      </div>

      {/* {showInfo ? (
        <div>
          <img className="info-image" src={imageUrl} height={400}></img>
        </div>
      ) : null} */}
      {props.hideUpset ? (
        <div>
          <UpSetJS
            sets={props.databaseData[0]}
            combinations={props.databaseData[1]}
            width={width}
            height={400}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UpsetView;
