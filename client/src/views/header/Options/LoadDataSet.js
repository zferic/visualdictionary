import { NavDropdown } from 'react-bootstrap';

const LoadDataSet = ({ loadDataSet }) => {
  return (
    <NavDropdown title="Data Sets" id="basic-nav-dropdown">
      <NavDropdown.Item onClick={(e) => loadDataSet('Stack Overflow Tags')}>
        Stack Overflow Tags
      </NavDropdown.Item>
      <NavDropdown.Item onClick={(e) => loadDataSet('Food Network')}>
        Food Network
      </NavDropdown.Item>
      <NavDropdown.Item onClick={(e) => loadDataSet('Miserables')}>
        Miserables
      </NavDropdown.Item>
      <NavDropdown.Item onClick={(e) => loadDataSet('Marvel')}>
        Marvel
      </NavDropdown.Item>
      <NavDropdown.Item onClick={(e) => loadDataSet('LosCachos')}>
        #LosCachosDeLaJuvinao
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoadDataSet;
