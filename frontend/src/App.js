import { BrowserRouter, Route, Link } from 'react-router-dom'
import ProductScreen from './views/product-screen'
import HomeScreen from './views/home-screen'
import CartScreen from './views/cart-screen';
import SigninScreen from './views/signin-screen'
import RegisterScreen from './views/register-screen'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/user-actions';
import ShippingAdressScreen from './views/shipping-adress-screen';
import PaymentScreen from './views/payment-method-screen'


function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazon-Clone
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {
            userInfo ? (
              <div className="dropdown">
                <Link to='#'>
                  {userInfo.name} <i className='fa fa-caret-down'></i> {' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                  </li>
                </ul>
              </div>
            )
            :
            (<Link to='/signin'>Sign In</Link>)
          }
        </div>
      </header>
      <main>
      <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAdressScreen}></Route>
        <Route path="/payment" component={PaymentScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
