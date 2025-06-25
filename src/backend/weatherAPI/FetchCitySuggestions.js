import axios from "axios"

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL_FOR_FETCHING_COORDINATES_WITH_CITY_NAME

//returns an array of unique cities for suggestions on search

export default async function fetchCitySuggestions(userInput) {
    if (!userInput) {
        return []
    }
    try {
        const response = await axios.get(apiUrl, { params: { q: userInput, limit: '10', appid: apiKey } })
        let uniqueResponse = response.data.filter((o, index) => response.data.findIndex(obj => (obj.name && obj.state) === (o.name && o.state)) === index) // Remove duplicates based on city name and state
        return uniqueResponse
    } catch (error) {
        console.error('Error fetching city suggestions:', error)
        throw error
    }
}