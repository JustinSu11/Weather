import axios from "axios"

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL_FOR_FETCHING_COORDINATES_WITH_CITY_NAME

export default async function fetchCitySuggestions(userInput) {
    if (!userInput) {
        return []
    }
    try {
        const response = await axios.get(apiUrl, { params: { q: userInput, appid: apiKey } })
        let uniqueResponse = response.data.filter((o, index) => response.data.findIndex(obj => obj.name === o.name) === index) // Remove duplicates based on city name
        return uniqueResponse
    } catch (error) {
        console.error('Error fetching city suggestions:', error)
        throw error
    }
}