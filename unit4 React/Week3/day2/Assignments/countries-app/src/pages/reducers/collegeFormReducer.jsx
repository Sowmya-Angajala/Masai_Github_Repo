export const initialCollegeForm = {
  name: "",
  age: "",
  gender: "",
  course: "",
  year: ""
};

export function collegeFormReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialCollegeForm;
    default:
      return state;
  }
}
