import axios from "axios"

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL_FOR_FETCHING_COORDINATES_WITH_CITY_NAME

export default async function fetchCitySuggestions(userInput) {
    if (!userInput || userInput.trim() === '') {
        return []
    }
    try {
        const response = await axios.get(apiUrl, { params: { q: userInput, limit: '5', appid: apiKey } })
        return response.data
    } catch (error) {
        console.error('Error fetching city suggestions:', error)
        throw error
    }
}