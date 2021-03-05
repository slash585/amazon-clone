import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/user-constants"
import axios from "axios"

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } })
  try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password })
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
      localStorage.setItem('user-info', JSON.stringify(data))
  } catch (e) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
      const { data } = await axios.post('http://localhost:5000/api/users/signin', { email,password })
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
      localStorage.setItem('user-info', JSON.stringify(data))
  } catch (e) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('user-info')
    localStorage.removeItem('cart-items')
    localStorage.removeItem('shippingAdress')
    dispatch({ type: USER_SIGNOUT })
}
