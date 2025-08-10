export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

export function authReducer(state, action){
  switch(action.type){
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, loading:false, isAuthenticated:true, user:action.payload.user, token:action.payload.token }
    case 'LOGIN_FAIL':
      return { ...state, loading:false, error:action.payload }
    case 'LOGOUT':
      return { ...initialAuthState }
    default:
      return state
  }
}