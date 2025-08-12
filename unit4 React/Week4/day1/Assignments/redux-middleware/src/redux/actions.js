// redux/actions.js
export const FETCH_COFFEE_REQUEST = "FETCH_COFFEE_REQUEST";
export const FETCH_COFFEE_SUCCESS = "FETCH_COFFEE_SUCCESS";
export const FETCH_COFFEE_FAILURE = "FETCH_COFFEE_FAILURE";

export const fetchCoffee = (sortBy = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COFFEE_REQUEST });
    try {
      const res = await fetch(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee?sort=${sortBy}`
      );
      const data = await res.json();
      dispatch({ type: FETCH_COFFEE_SUCCESS, payload: data.data });
    } catch (err) {
      dispatch({ type: FETCH_COFFEE_FAILURE, payload: err.message });
    }
  };
};
