import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cart-constants'

export const addToCart = (productId, qty) => async(dispatch, getState) =>{
    const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    })

    localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => async(dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId })

    localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAdress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADRESS, payload:data })
    localStorage.setItem('shippingAdress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    // localStorage.setItem('payment-method', JSON.stringify(data))
}