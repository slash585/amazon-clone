import axios from "axios"
import { CART_ADD_ITEM } from '../constants/cart-constants'

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