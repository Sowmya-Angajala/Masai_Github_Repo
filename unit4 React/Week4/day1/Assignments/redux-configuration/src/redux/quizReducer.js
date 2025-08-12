import { QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAILURE, UPDATE_SCORE } from "./actionTypes";

const initialState = {
  questions: [],
  loading: false,
  error: null,
  score: 0
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_REQUEST:
      return { ...state, loading: true, error: null };
    case QUIZ_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case QUIZ_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_SCORE:
      return { ...state, score: state.score + action.payload };
    default:
      return state;
  }
};
