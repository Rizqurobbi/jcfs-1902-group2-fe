import axios from "axios";
import { API_URL } from "../../helper";

export const getProductAction = (search = null) => {
    return async (dispatch) => {
        try {
            // let token = localStorage.getItem('data');
            let res;
            // if(token){
            // if (search) {
            //     if (search.nama) {
            //         res = await axios.get(`${API_URL}/products?nama=${search.nama}`)
            //     } else if() {
            //         res = await axios.get(`${API_URL}/products?idcategory=${search.idcategory}`)
            //     }
            // } else {
            //     res = await axios.get(`${API_URL}/products`)
            // }
            if (search) {
                if (search.nama) {
                    if (search.idcategory > 0) {
                        res = await axios.get(`${API_URL}/products?nama=${search.nama}&idcategory=${search.idcategory}`)
                    }else{
                        res = await axios.get(`${API_URL}/products?nama=${search.nama}`)
                    }
                }else{
                    res = await axios.get(`${API_URL}/products?idcategory=${search.idcategory}`)
                }
            } else{
                res = await axios.get(`${API_URL}/products`)
            }
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

export const sortingProduct = (sort) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data.dataProducts
               })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCategory = () => {
    return async (dispatch) => {
        try {
            let resCategory = await axios.get(`${API_URL}/products/category`)
            console.log("data product", { category: resCategory.data.dataCategory })
            dispatch({
                type: "GET_DATA_CATEGORY",
                payload: { category: resCategory.data.dataCategory }
            })
        } catch (error) {
            console.log(error)
        }
    }
}