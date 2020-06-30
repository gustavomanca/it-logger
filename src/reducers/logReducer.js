import {
  GET_LOGS,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
} from "../actions/types";

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };

    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };

    case UPDATE_LOG:
      const logIndex = state.logs.findIndex(
        (log) => log.id === action.payload.id
      );

      state.logs[logIndex] = {
        ...action.payload,
      };

      return {
        ...state,
        logs: [...state.logs],
        loading: false,
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: [...state.logs.filter((log) => log.id !== action.payload)],
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGS_ERROR:
      console.error(action.payload);

      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
