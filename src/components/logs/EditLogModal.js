import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog } from "../../actions/logActions";

const EditLogModal = ({ updateLog }) => {
  const currentLog = useSelector((state) => state.log.current);
  const inputTitle = useRef(null);
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (currentLog) setLog();
  }, [currentLog]); //eslint-disable-line

  const setLog = () => {
    const { message, attention, tech } = currentLog;

    setMessage(message);
    setAttention(attention);
    setTech(tech);
    inputTitle.current.focus();
  };

  const onSubmit = (e) => {
    if (!message || !tech) {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const updatedLog = {
        id: currentLog.id,
        message,
        tech,
        attention,
      };

      updateLog(updatedLog);

      M.toast({ html: `Log updated by ${updatedLog.tech}!` });
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              ref={inputTitle}
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
                Select Technician
              </option>
              <option value="John Doe">John Doe</option>
              <option value="Sam Smith">Sam Smith</option>
              <option value="Sara Wilson">Sara Wilson</option>
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

const modalStyle = {
  height: "75%",
  width: "75%",
};

export default connect(null, { updateLog })(EditLogModal);
