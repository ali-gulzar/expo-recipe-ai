import axios from 'axios'

const API_URL = 'https://6btotueczejhfjqcrb4c5jfmei0kkdme.lambda-url.eu-west-3.on.aws'

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
