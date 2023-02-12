const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART')
        return { ...state,cart: [] }
    if(action.type === 'LOADING')
        return {...state, loading: true}
    if(action.type === 'DISPLAY_CART')
        return {...state, cart: action.payload, loading: false}
    if(action.type ==='REMOVE') {
        return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload)
        }
    }
    if(action.type === 'INCREMENT'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload)
                return {...item, amount: item.amount + 1}
            return item
        })
        return {...state, cart: tempCart}
    }
    if(action.type === 'DECREMENT') {
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload)
                return {...item, amount: item.amount - 1}
            return item
        }).filter((item) => item.amount > 0)
        return {...state, cart: tempCart}
    }
    if(action.type === 'GET_TOTALS'){
        let {total, amount} = state.cart.reduce(
            (cartTotal, item) => {
                const {price, amount} = item;
                const itemTotal = price * amount;

                cartTotal.amount += amount;
                cartTotal.total += itemTotal
                return cartTotal
            },
            {
                total: 0,
                amount: 0
            }
        )
        total = parseFloat(total.toFixed(2))

        return {...state, amount, total}
    }
    throw new Error('Unhandled action type.');
}

export default reducer