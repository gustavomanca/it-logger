import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { SEARCH_LOGS } from "../../actions/types";
import { getLogs } from "../../actions/logActions";

const SearchBar = ({ getLogs }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      dispatch({ type: SEARCH_LOGS, payload: query });
    } else {
      getLogs();
    }
  }, [query]); //eslint-disable-line

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
              required
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={() => setQuery("")}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default connect(null, { getLogs })(SearchBar);
