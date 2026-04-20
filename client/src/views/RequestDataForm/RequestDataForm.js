import React, { useState } from 'react';
import emailjs from 'emailjs-com';

let dataKeys = {
  'Variable / Field Name': '',
  'Form Name': '',
  'Section Header': '',
  'Field Type': '',
  'Field Label': '',
  'Choices Calculations OR Slider Labels': '',
  'Field Note': '',
  'Text Validation Type OR Show Slider Number': '',
  'Text Validation Min': '',
  'Text Validation Max': '',
  'Identifier?': '',
  'Branching Logic (Show field only if...)': '',
  'Required Field?': '',
  'Custom Alignment': '',
  'Question Number (surveys only)': '',
  'Matrix Group Name': '',
  'Matrix Ranking?': '',
  'Field Annotation': '',
  Type: '',
  VisitID: '',
  VisitIDNum: '',
};
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

function downloadCSV(array) {
  const link = document.createElement('a');

  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  return link.href;
}

const RequestDataForm = (props) => {
  // const serviceID = 'service_7y34p38';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [dataCSV, setDataCSV] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let array = props.smallTableData;

    let link = downloadCSV(array);

    var templateParams = {
      name: name,
      email: email,
      institution: institution,
      additionalMessage: additionalMessage,
      link: link,
    };
    props.setIsOpen(!props.isOpen);

    emailjs
      .send(
        process.env.REACT_APP_serviceID,
        process.env.REACT_APP_templateID,
        templateParams,
        process.env.REACT_APP_user
      )

      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <>
          <form class="form-vertical" onSubmit={handleSubmit}>
            <div>
              Please type in all of your information below. The data from all
              the tables in the upper left will be sent to the database
              administrators. The email you type below will be cc'd to the email
              sent to the database administrators.
            </div>
            <div class="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={name}
                class="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={email}
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label>Institution:</label>
              <input
                type="text"
                value={institution}
                class="form-control"
                onChange={(e) => setInstitution(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label>AdditionalMessage:</label>
              <textarea
                type="text"
                value={additionalMessage}
                class="form-control"
                onChange={(e) => setAdditionalMessage(e.target.value)}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </>
      </div>
    </div>
  );
};

export default RequestDataForm;
