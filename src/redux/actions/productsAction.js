import axios from "axios";
import { API_URL } from "../../helper";

export const getProductAction = (search = null) => {
    return async (dispatch) => {
        try {
            // let token = localStorage.getItem('data');
            let res;
            // if(token){
                res = await axios.get(`${API_URL}/products`)
            // }
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data.dataProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}
