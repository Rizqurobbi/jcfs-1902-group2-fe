const INTIAL_STATE = {
    products: [],
    category: [],
    unit:[]
}
export const productsReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            return { ...state, products: action.payload }
        case "GET_DATA_CATEGORY":
            return { ...state, ...action.payload };
        case "GET_DATA_UNIT":
            return { ...state, ...action.payload };
        case "OUT_PRODUCT":
            return { ...state, ...action.payload}
        default:
            return state;
    }
}