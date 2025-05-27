import fetchUserLocation from '../../backend/fetchUserLocation'
// import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'
import WeatherInfoContainer from './WeatherInfoContainer'
import React, { useState, useEffect } from 'react'

export default function MainDisplay() {
    //state to hold cities list 
    const [citiesList, setCitiesList] = useState([])
    //state to hold selected city
    const [selectedCity, setSelectedCity] = useState(null)
    //loading state for MainDisplay
    const [mainDisplayLoading, setMainDisplayLoading] = useState(true)
    const [errorGettingUserLocation, setErrorGettingUserLocation] = useState(false)

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
        const initialLoad = async () => {
            try {
                const userLocation = await fetchUserLocation()
                if (userLocation) {
                    setSelectedCity(userLocation)
                    if (citiesList.some(city => city.cityName === userLocation.cityName)) {
                        console.log('City already in list: ', userLocation.cityName)
                    } else {
                        setCitiesList(prevCitiesList => [...prevCitiesList, userLocation])
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user location: ", error)
                setErrorGettingUserLocation(true)
            } finally {
                setMainDisplayLoading(false)
            }
        }
        initialLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (mainDisplayLoading === false) {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <div className="main-display-weather-graph"></div>
                <div className="main-display-content">
                    <WeatherInfoContainer weatherInfo={selectedCity.weatherInfo} />
                </div>
            </div>
        )
    } else if (errorGettingUserLocation === true) {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <div className="main-display-weather-graph"></div>
                <div className="main-display-content">
                    <p>Error getting user location. Please check your browser settings.</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <div className="main-display-weather-graph"></div>
                <div className="main-display-content">
                    <p>loading...</p>
                </div>
            </div>
        )
    }
}