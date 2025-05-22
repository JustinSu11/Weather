import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'
import WeatherInfoContainer from './WeatherInfoContainer'
import React, { useState, useEffect } from 'react'

export default function MainDisplay() {
    //state to hold cities list 
    const [citiesList, setCitiesList] = useState([])
    //invoke api fetch for weather info
    const [selectedCity, setSelectedCity] = useState(null)

    // function addCityToList(cityAndWeatherInfo) {
    //     if (!citiesList.some(cityAndWeatherInfo)) {
    //         let newCitiesList = [...citiesList, cityAndWeatherInfo]
    //         setCitiesList(newCitiesList)
    //         setSelectedCity(cityAndWeatherInfo)
    //     } else {
    //         alert('City already in list')
    //     }
    // }

    useEffect(() => {
        setSelectedCity(navigator.geolocation.getCurrentPosition(fetchCoordinatesFromName, console.log('Error getting location')))
        let newCitiesList = [...citiesList, selectedCity]
        setCitiesList(newCitiesList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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