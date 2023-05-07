import axios from 'axios'

import { API_URL } from '../constants'

export const fetchRecipes = (ingredient, accessToken) => {
    return axios.get(`${API_URL}/recipe/recipes`, {
        params: {
            ingredient
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const inferIngredient = (imageUrl, accessToken) => {
    return axios.get(`${API_URL}/recipe/infer_ingredient`, {
        params: {
            image_url: imageUrl
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const uploadImage = (image, accessToken) => {
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
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getRecipe = (recipeId, accessToken) => {
    return axios.get(`${API_URL}/recipe/${recipeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}
