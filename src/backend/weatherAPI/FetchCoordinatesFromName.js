import axios from 'axios'
import fetchWeatherInfo from './FetchWeatherInfo'

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL_FOR_FETCHING_COORDINATES_WITH_CITY_NAME
const apiUrlForReverseGeocoding = process.env.REACT_APP_API_URL_FOR_REVERSE_GEOCODING

//takes an input and depending on if the input is a coordinate or a city name it will call the fetchWeatherInfo method for that city and return the object with the name
//returns the an object with the city name and the weather info
export default async function fetchCoordinatesFromName(userInput) {
    //check if input is the position object from the browser, if it is then fetch weather info using the latitude and longitude
    if (!userInput.coords) {
        try {
            const [city, state] = userInput.split(', ')
            const response = await axios.get(apiUrl, { params: { q: userInput, limit: '5', appid: apiKey}})
            const filteredResponse = response.data.filter((cityNameAndState) => cityNameAndState.name === city && cityNameAndState.state === state)
            const cityName = {name: filteredResponse[0].name, state: filteredResponse[0].state}
            const latitude = filteredResponse[0].lat
            const longitude = filteredResponse[0].lon
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
            const cityName = {name: reverseGeocodingResponse.data[0].name, state: reverseGeocodingResponse.data[0].state}
            console.log(reverseGeocodingResponse.data)
            //console log for weather info object properties
            console.log('Weather info fetched from current latitude and longitude: ', weatherInfo)
            return {cityName, weatherInfo}
        } catch (error) {
            console.log('Error fetching weather info from current latitude and longitude: ', error)
            throw error
        }
    }
}