const INTIAL_STATE = {
    products: [],
    category: []
}
export const productsReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, products: action.payload }
        case "GET_DATA_CATEGORY":
            console.log("cek product", action.payload)
            return { ...state, ...action.payload };
        default:
            return state;
    }
}