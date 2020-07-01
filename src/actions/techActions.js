import {
  GET_TECHS,
  ADD_TECH,
  TECHS_ERROR,
  SET_LOADING,
  DELETE_TECH,
} from "../actions/types";

export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/techs");

    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};

export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};

export const deleteTech = (techId) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/techs/${techId}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_TECH,
      payload: techId,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
