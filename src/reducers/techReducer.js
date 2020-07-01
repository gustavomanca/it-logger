import { ADD_TECH, DELETE_TECH, GET_TECHS } from "../actions/types";

const initialState = {
  techs: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
      };

    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false,
      };

    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((tech) => tech.id !== action.payload),
        loading: false,
      };

    default:
      return state;
  }
};
