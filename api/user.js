import { API_URL } from '../constants'
import axios from 'axios'

export const loginUser = (email, password) => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)

    return axios.post(`${API_URL}/user/login`, formData)
}

export const signupUser = (email, password, name) => {
    const body = {
        email: email,
        password: password,
        name: name
    }
    return axios.post(`${API_URL}/user/create`, body)
}