const INTIAL_STATE = {
    products: [],
    category: [],
    unit:[]
}
export const productsReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, products: action.payload }
        case "GET_DATA_CATEGORY":
            console.log("cek category", action.payload)
            return { ...state, ...action.payload };
        case "GET_DATA_UNIT":
            console.log("cek unit", action.payload)
            return { ...state, ...action.payload };
        case "OUT_PRODUCT":
            return { ...state, ...action.payload}
        default:
            return state;
    }
}