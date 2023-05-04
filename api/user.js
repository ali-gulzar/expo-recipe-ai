import { API_URL } from '../constants'
import axios from 'axios'

export const loginUser = (email, password) => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)

    return axios.post(`${API_URL}/user/login`, formData)
}
