const INITIAL_STATE = {
    carts: [],
    transactions: []
}
export const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_CART":
            console.log('cek carts', action.payload)
            return { ...state, carts: action.payload }
        case "GET_TRANSACTIONS":
            console.log('transaction', action.payload)
            return { ...state, transactions: action.payload}
        default:
            return state;
    }
}