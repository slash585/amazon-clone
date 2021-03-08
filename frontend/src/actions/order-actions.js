import axios from "axios"
import { CART_EMPTY } from "../constants/cart-constants"
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/order-constants"

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      order,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CART_EMPTY })
    localStorage.removeItem("cart-items")
  } catch (e) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    })
  }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
  }
}
