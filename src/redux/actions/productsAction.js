import axios from "axios";
import { API_URL } from "../../helper";

export const getProductAction = (search = null) => {
    return async (dispatch) => {
        try {
            let res;
            if (search) {
                if (search.nama) {
                    if (search.idcategory > 0) {
                        res = await axios.get(`${API_URL}/products?nama=${search.nama}&idcategory=${search.idcategory}`)
                    } else {
                        res = await axios.get(`${API_URL}/products?nama=${search.nama}`)
                    }
                } else {
                    res = await axios.get(`${API_URL}/products?idcategory=${search.idcategory}`)
                }
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
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
            let res;
            if (sort) {
                if (sort.idcategory > 0) {
                    res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}&idcategory=${sort.idcategory}`)
                } else {
                    res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
                }
            } else {
               res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
            }
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
            dispatch({
                type: "GET_DATA_CATEGORY",
                payload: { category: resCategory.data.dataCategory }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getUnit = () => {
    return async (dispatch) => {
        try {
            let resUnit = await axios.get(`${API_URL}/products/unit`)
            dispatch({
                type: "GET_DATA_UNIT",
                payload: { unit: resUnit.data.dataUnit }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const outStockAction = (stock) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/products/outstock`, stock)
            dispatch({
                type: "OUT_PRODUCT",
                payload: res.data.success
            })
            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }
}