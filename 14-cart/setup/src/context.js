import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: true,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const clearCart = (  ) => dispatch({type: 'CLEAR_CART'})
  const increment = (id) => dispatch({type: 'INCREMENT', payload: id})
  const decrement = (id) => dispatch({type: 'DECREMENT', payload: id})
  const remove    = (id) => dispatch({type: 'REMOVE', payload: id})
  const fetchData = async () => {
    dispatch({type: 'LOADING'})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type: 'DISPLAY_CART', payload: cart})
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({type: 'GET_TOTALS', })
  }, [state.cart])


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        increment,
        decrement,
        remove,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
