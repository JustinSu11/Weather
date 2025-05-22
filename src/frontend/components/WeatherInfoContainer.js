import React from 'react'

export default function WeatherInfoContainer(props) {
    return (
        //container for selected city weather info
        <div className = "weather-info-container">
            <div className = "weather-info-header">Weather Info</div>
            <div className = "weather-info-content">
                <div className = "weather-info-item">{props.weatherInfo}</div>
                <div className = "weather-info-item">{props.weatherInfo}</div>
                <div className = "weather-info-item">{props.weatherInfo}</div>
            </div>
        </div>
    )
}