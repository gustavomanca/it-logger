import React from "react";
import Moment from "react-moment";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteLog } from "../../actions/logActions";
import { SET_CURRENT } from "../../actions/types";
import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({ log, deleteLog }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    deleteLog(log.id);

    M.toast({ html: "Log deleted!" });
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${
            log.attention ? "red-text" : "blue-text"
          }`}
          onClick={() => dispatch({ type: SET_CURRENT, payload: log })}
        >
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{log.id}</span> last updated by{" "}
          <span className="black-text">{log.tech}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
        <a href="#!" className="secondary-content" onClick={(e) => onDelete()}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default connect(null, { deleteLog })(LogItem);
