import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = itemId =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachObj => eachObj.id !== itemId),
    }))

  incrementCartItemQuantity = itemId =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachObj => {
        if (eachObj.id === itemId) {
          return {
            ...eachObj,
            quantity: eachObj.quantity + 1,
          }
        }

        return eachObj
      }),
    }))

  decrementCartItemQuantity = itemId =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachObj => {
        if (eachObj.id === itemId) {
          return {
            ...eachObj,
            quantity: eachObj.quantity - 1,
          }
        }

        return eachObj
      }),
    }))

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const inCart = cartList.some(eachObj => eachObj.id === product.id)
    if (inCart) {
      this.incrementCartItemQuantity(product.id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
