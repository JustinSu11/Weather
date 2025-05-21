import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'
import WeatherInfoContainer from './WeatherInfoContainer'
import cities from '../../config/config'
import React, { useState, useEffect } from 'react'

export default function MainDisplay() {
    //invoke api fetch for weather info
    var [selectedCity, setSelectedCity] = useState(addCityToList(navigator.geolocation.getCurrentPosition(fetchCoordinatesFromName, console.log('Error getting location'))))

    function addCityToList(cityAndWeatherInfo) {
        if (!cities.contains(cityAndWeatherInfo)) {
            cities.push(cityAndWeatherInfo)
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