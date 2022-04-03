import axios from "axios"
import { API_URL } from "../../helper"

export const verifyLogin = () => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log(token)
            if (token) {
                let res = await axios.get(`${API_URL}/users/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataVerify.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataVerify
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/users/login`,{
                email, password
            })
            if (res.data.success) {
                console.log('ini data', res.data.dataLogin)
                localStorage.setItem("data", (res.data.dataLogin.token))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.dataLogin
                })
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data")
            if(token) {
                let res = await axios.get(`${API_URL}/users/keeplogin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataKeepLogin.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataKeepLogin
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)     
        }
    }
}

export const resetPassword = ( newPass ) => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log('initoken dan pass', token, newPass)
            if (token) {
                let res = await axios.post(`${API_URL}/users/reset`, {newPass},  {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataReset.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataReset
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutAction = () => {
    return {
        type: "LOGOUT"
    }
}