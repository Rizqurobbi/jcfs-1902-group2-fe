const INTIAL_STATE = {
    products: []
}
export const productsReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, products: action.payload }
        default:
            return state;
    }
}