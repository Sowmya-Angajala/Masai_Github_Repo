// redux/actions.js
export const FETCH_COFFEE_REQUEST = "FETCH_COFFEE_REQUEST";
export const FETCH_COFFEE_SUCCESS = "FETCH_COFFEE_SUCCESS";
export const FETCH_COFFEE_FAILURE = "FETCH_COFFEE_FAILURE";

export const fetchCoffee = (sortBy = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COFFEE_REQUEST });
    try {
      const res = await fetch(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee`
      );
      const data = await res.json();

      let sortedData = data.data;

      if (sortBy === "price") {
        sortedData = sortedData.slice().sort((a, b) => a.price - b.price);
      } else if (sortBy === "title") {
        sortedData = sortedData.slice().sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }

      dispatch({ type: FETCH_COFFEE_SUCCESS, payload: sortedData });
    } catch (err) {
      dispatch({ type: FETCH_COFFEE_FAILURE, payload: err.message });
    }
  };
};

