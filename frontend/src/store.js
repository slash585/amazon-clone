import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cart-reducer'
import { productDetailsReducer, productListReducer } from './reducers/product-reducer'
import { userSigninReducer } from './reducers/user-reducer'

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : null
    },
    cart: {
        cartItems: localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store