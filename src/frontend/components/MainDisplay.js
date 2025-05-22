import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'
import WeatherInfoContainer from './WeatherInfoContainer'
import React, { useState } from 'react'

export default function MainDisplay() {
    //invoke api fetch for weather info
    const [selectedCity, setSelectedCity] = useState(addCityToList(navigator.geolocation.getCurrentPosition(fetchCoordinatesFromName, console.log('Error getting location'))))
    //state to hold cities list 
    const [citiesList, setCitiesList] = useState([])

    function addCityToList(cityAndWeatherInfo) {
        let oldCitiesList = citiesList
        if (!oldCitiesList.contains(cityAndWeatherInfo)) {
            oldCitiesList.push(cityAndWeatherInfo)
            setCitiesList(oldCitiesList)
            setSelectedCity(cityAndWeatherInfo)
        } else {
            alert('City already in list')
        }
    }

    return (
        <div className="main-display">
            <div className="main-display-header">Weather App</div>
            <div className="main-display-weather-graph"></div>
            <div className="main-display-content">
                <WeatherInfoContainer weatherInfo={selectedCity.weatherInfo} />
            </div>
        </div>
    )
}