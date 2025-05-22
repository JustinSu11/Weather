import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

export default async function fetchWeatherInfo(latitude, longitude) {
    const apiUrl = process.env.REACT_APP_API_URL
    try {
        const response = await axios.get(apiUrl, { params: { lat: latitude, lon: longitude, units: 'imperial', exclude: 'minutely', appid: apiKey }})
        return response.data
    } catch(error) {
        console.log('Error fetching weather info: ', error)
        throw error
    }
}
