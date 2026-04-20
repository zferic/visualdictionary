import { Button, Modal, Nav } from 'react-bootstrap';
import { useState } from 'react';

const About = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("About component rendered");

  return (
    <>
      <Nav.Link style={{ color: 'white' }} onClick={handleShow}>
        About
      </Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you have any questions, please email Griffith Gao <a href= "mailto: q.gao@northeastern.edu"> q.gao@northeastern.edu</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default About;
