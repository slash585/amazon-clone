import { PRODUCT_DETAIL_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from '../constants/product-constant'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    try{
        const { data } = await axios.get("http://localhost:5000/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }catch(e){
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message})
    }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({type: PRODUCT_DETAIL_REQUEST, payload: productId})
    try{
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`)
        dispatch({ type:PRODUCT_DETAIL_SUCCESS, payload:data})
    }catch(e){
        dispatch({ type:PRODUCT_DETAIL_FAIL, payload:e.response &&  e.response.data.message
            ? e.response.data.message
            : e.message,
        })
    }
}