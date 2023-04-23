import axios from 'axios'

const API_URL = 'https://6btotueczejhfjqcrb4c5jfmei0kkdme.lambda-url.eu-west-3.on.aws'

export const getAnimation = (animation_name) => {
    return axios.get(`${API_URL}/animation/${animation_name}`)
}
