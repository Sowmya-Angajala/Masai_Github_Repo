export const initialCollegeState = {
  fields: {
    collegeName: '',
    degree: '',
    startYear: '',
    endYear: '',
    cgpa: ''
  },
  errors: {},
  submitting: false,
  submitted: false
}

export function collegeReducer(state, action){
  switch(action.type){
    case 'SET_FIELD':
      return { ...state, fields: { ...state.fields, [action.field]: action.value } }
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } }
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    case 'SUBMIT_START':
      return { ...state, submitting:true, submitted:false }
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting:false, submitted:true }
    case 'SUBMIT_FAIL':
      return { ...state, submitting:false }
    default:
      return state
  }
}