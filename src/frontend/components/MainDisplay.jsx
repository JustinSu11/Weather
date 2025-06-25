import fetchUserLocation from '../../backend/fetchUserLocation'
// import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'
import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import CityNavigator from './CityNavigator'

//css import
import './MainDisplay.css'
import fetchCoordinatesFromName from '../../backend/weatherAPI/FetchCoordinatesFromName'

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

    //useEffect to run once on initial render
    useEffect(() => {
        // will attempt to fetch the user's location, set selected city, and retrieve the weather info
        const initialLoad = async () => {
            try {
                //userLocation is an object that has the city name and weather info
                const userLocation = await fetchUserLocation()
                if (userLocation) {
                    setSelectedCity(userLocation)
                    if (citiesList.some(city => city.cityName === userLocation.cityName)) {
                        console.log('City already in list: ', userLocation.cityName)
                    } else {
                        setCitiesList(prevCitiesList => [...prevCitiesList, userLocation.cityName])
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

    // used when a suggestion is selected from the search bar to update the weather info card
    const handleCitySelect = async (cityName) => {
        if (!cityName) {
            return
        }
        setMainDisplayLoading(true)
        try {
            let cityAndWeatherInfo = await fetchCoordinatesFromName(cityName)
            console.log('handle city select: ', cityAndWeatherInfo)
            setSelectedCity(cityAndWeatherInfo)
            if (!citiesList.includes(cityName)){
                setCitiesList(prevCitiesList => [...prevCitiesList, cityName])
                console.log('Updated cities list: ', citiesList)
            }
        } catch (error) {
            console.error('Error fetching weather info for selected city: ', error)
            setErrorGettingUserLocation(true)
        } finally {
            setMainDisplayLoading(false)
        }
    }

    const handleTabChange = async (cityName) => {
        const cityToSelect = await fetchCoordinatesFromName(citiesList.find(city => city === cityName))
        if (cityToSelect) {
            setSelectedCity(cityToSelect)
        } else {
            console.warn('City not found in cities list:', cityName)
        }
    }

    //conditional rendering to display main content, error message, or loading message
    if (mainDisplayLoading === false && errorGettingUserLocation === false) {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <SearchBar onCitySelect={handleCitySelect} />
                <CityNavigator citiesList={citiesList} selectedCity={selectedCity} onTabChange={handleTabChange}/>
            </div>
        )
    } else if (errorGettingUserLocation === true) {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <SearchBar onCitySelect={handleCitySelect} />
                <div className="main-display-content">
                    <p>Error getting user location. Please check your browser settings.</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="main-display">
                <div className="main-display-header">Weather App</div>
                <SearchBar onCitySelect={handleCitySelect} />
                <div className="main-display-content">
                    <p>loading...</p>
                </div>
            </div>
        )
    }
}