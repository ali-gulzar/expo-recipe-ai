import axios from 'axios'
import { API_URL } from '../constants'

export const getAnimation = (animation_name) => {
    return axios.get(`${API_URL}/animation`, { params: { animation_name } })
}
