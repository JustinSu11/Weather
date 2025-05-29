import React from 'react'

// import css
import './WeatherInfoContainer.css'

export default function WeatherInfoContainer(props) {
    return (
        //container for selected city weather info
        <div className = "weather-info-container">
            <div className = "weather-info-header">Weather Info</div>
            <div className = "weather-info-content">
                <div className = "weather-info-item">{props.weatherInfo.current.humidity}%</div>
                <div className = "weather-info-item">{Math.round(props.weatherInfo.current.feels_like)}°</div>
                <div className = "weather-info-item">{props.weatherInfo.current.wind_speed}mph</div>
            </div>
        </div>
    )
}