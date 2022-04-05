const INITIAL_STATE = {
    carts: []
}
export const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_CART":
            console.log('cek carts', action.payload)
            return { ...state, carts: action.payload }
        default:
            return state;
    }
}