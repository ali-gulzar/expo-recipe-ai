import axios from 'axios'
import { API_URL } from '../constants'

export const fetchRecipes = (ingredient) => {
    return axios.get(`${API_URL}/recipe/recipes`, {
        params: {
            ingredient
        }
    })
}

export const inferIngredient = (imageUrl) => {
    return axios.get(`${API_URL}/recipe/infer_ingredient`, {
        params: {
            image_url: imageUrl
        }
    })
}

export const uploadImage = (image) => {
    const formData = new FormData()
    const fileType = image.fileName.split('.')[1]
    const file = {
        uri: image.uri,
        type: `image/${fileType}`,
        name: image.fileName
    }
    formData.append('image', file)
    return axios.post(`${API_URL}/recipe/upload_image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
