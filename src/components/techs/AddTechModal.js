import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { addTech } from "../../actions/techActions";

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const clearForm = () => {
    setFirstName("");
    setLastName("");
  };

  const onSubmit = (e) => {
    if (!firstName || !lastName) {
      M.toast({ html: "Please enter the first and last name" });
    } else {
      const newTech = {
        firstName,
        lastName,
      };

      addTech(newTech);

      M.toast({ html: "New tech added!" });
      clearForm();
    }
  };

  return (
    <div id="add-tech-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  height: "75%",
  width: "75%",
};

export default connect(null, { addTech })(AddTechModal);
