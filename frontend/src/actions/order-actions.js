import axios from "axios"
import { CART_EMPTY } from "../constants/cart-constants"
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/order-constants"

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await axios.post("http://localhost:5000/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CART_EMPTY })
    localStorage.removeItem("cart-items")
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
