import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addLog } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js";

const AddLogModal = ({ addLog }) => {
  const techs = useSelector((state) => state.tech.techs);
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = (e) => {
    if (!message || !tech) {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `Log added by ${tech}` });

      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={({ target }) => setMessage(target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={({ target }) => setTech(target.value)}
            >
              <option value="" disabled>
                {techs.length ? "Select Technician" : "No technicians found"}
              </option>
              {techs.map((tech) => {
                const techName = `${tech.firstName} ${tech.lastName}`;
                return (
                  <option value={techName} key={tech.id}>
                    {techName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

const modalStyle = {
  height: "75%",
  width: "75%",
};

export default connect(null, { addLog })(AddLogModal);
