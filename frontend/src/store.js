import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cart-reducer'
import { productDetailsReducer, productListReducer } from './reducers/product-reducer'

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store