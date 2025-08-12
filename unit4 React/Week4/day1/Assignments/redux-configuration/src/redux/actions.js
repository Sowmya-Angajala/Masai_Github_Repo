import axios from "axios";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAILURE, UPDATE_SCORE
} from "./actionTypes";

// Login action
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post("https://reqres.in/api/login", { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response?.data?.error || "Login Failed" });
  }
};

// Fetch quiz
export const fetchQuiz = () => async (dispatch) => {
  dispatch({ type: QUIZ_REQUEST });
  try {
    const res = await axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz");
    dispatch({ type: QUIZ_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: QUIZ_FAILURE, payload: err.message });
  }
};

// Update score
export const updateScore = (points) => ({ type: UPDATE_SCORE, payload: points });
