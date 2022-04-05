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