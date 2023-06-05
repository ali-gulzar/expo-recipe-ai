import axios from 'axios'

import { API_URL } from '../constants'

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

export const deleteUser = (accessToken) => {
    return axios.delete(`${API_URL}/user/delete`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}

export const saveRecipe = (recipeId, accessToken) => {
    const body = {
        recipe_id: recipeId
    }
    return axios.post(`${API_URL}/user/save`, body, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}

export const unsaveRecipe = (recipeId, accessToken) => {
    const body = {
        recipe_id: recipeId
    }
    return axios.delete(`${API_URL}/user/unsave`, {
        data: body,
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}

export const getSavedRecipes = (accessToken) => {
    return axios.get(`${API_URL}/user/saved-recipes`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
}
