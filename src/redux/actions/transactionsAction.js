import axios from "axios";
import { API_URL } from "../../helper";

export const getCartAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data');
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/carts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({
                    type: "GET_DATA_CART",
                    payload: res.data.dataCart
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const addToCartAction = (data) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.post(`${API_URL}/transactions/carts`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    dispatch(getCartAction())
                    return { success: true, message: "Add to cart success" }
                } else {
                    return { success: false, message: "Stock sudah habis" }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
// export const deleteCart = (id) => {
//     return async (dispatch) => {
//         try {
//             let token = localStorage.getItem('data')
//             if(token){
//                 let res = await axios.
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }