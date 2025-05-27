import axios from 'axios'
import fetchWeatherInfo from './FetchWeatherInfo'

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL_FOR_FETCHING_COORDINATES_WITH_CITY_NAME
const apiUrlForReverseGeocoding = process.env.REACT_APP_API_URL_FOR_REVERSE_GEOCODING

//returns the an object with the city name and the weather info
export default async function fetchCoordinatesFromName(userInput) {
    //check if input is the position object from the browser, if it is then fetch weather info using the latitude and longitude
    if (!userInput.coords) {
        try {
            const response = await axios.get(apiUrl, { params: { q: userInput, limit: '5', appid: apiKey}})
            const cityName = response.data[0].name
            const latitude = response.data[0].lat
            const longitude = response.data[0].lon
            console.log(response.data)
            const weatherInfo = await fetchWeatherInfo(latitude, longitude)
            return {cityName, weatherInfo}
        } catch (error) {
            console.log('Error fetching coordinates from the city name: ', error)
            throw error
        }
    } else {
        try {
            const weatherInfo = await fetchWeatherInfo(userInput.coords.latitude, userInput.coords.longitude)
            const reverseGeocodingResponse = await axios.get(apiUrlForReverseGeocoding, { params: { lat: userInput.coords.latitude, lon: userInput.coords.longitude, appid: apiKey}})
            const cityName = reverseGeocodingResponse.data[0].name
            console.log(reverseGeocodingResponse.data)
            console.log('Weather info fetched from current latitude and longitude: ', weatherInfo)
            return {cityName, weatherInfo}
        } catch (error) {
            console.log('Error fetching weather info from current latitude and longitude: ', error)
            throw error
        }
    }
}