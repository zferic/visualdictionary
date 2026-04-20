import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import About from './Options/About';
import LoadDataSet from './Options/LoadDataSet';

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: "#1a8d5f" }} expand="lg" fixed="top">
      <Navbar.Brand style={{ color: "white" }} href="#home">PROTECT DATABASE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LoadDataSet loadDataSet={loadDataSet} /> */}
          <About />
          <Nav.Link
            href={`${process.env.PUBLIC_URL}/data/bioPlayground.csv`}
            download="bioPlayground.csv"
            style={{ color: "white" }}
          >
            Download Data Dictionary
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
