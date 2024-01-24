import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../utils/ApiFunctions";

const PasswordChangePopUp = ({ show, handleClose, email }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });

  const [toggleData, setToggleData] = useState({
    currentPassword: false,
    newPassword: false,
    newPasswordAgain: false,
  });

  const handleToggle = (name) => {
    setToggleData((prevData) => ({
      ...prevData,
      [name]: !toggleData[name],
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
   await changePassword(email, formData.currentPassword, formData.newPassword);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="currentPassword" className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={toggleData.currentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <Button
                onClick={() => handleToggle("currentPassword")}
                className="ms-2"
              >
                {toggleData.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={toggleData.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <Button
                onClick={() => handleToggle("newPassword")}
                className="ms-2"
              >
                {toggleData.newPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
          <Form.Group controlId="newPasswordAgain" className="mb-3">
            <Form.Label>New Password Again</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={toggleData.newPasswordAgain ? "text" : "password"}
                name="newPasswordAgain"
                placeholder="New Password Again"
                value={formData.newPasswordAgain}
                onChange={handleChange}
              />
              <Button
                onClick={() => handleToggle("newPasswordAgain")}
                className="ms-2"
              >
                {toggleData.newPasswordAgain ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger"
          variant="secondary"
          onClick={() => {
            setFormData({
              currentPassword: "",
              newPassword: "",
              newPasswordAgain: "",
            });
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordChangePopUp;
