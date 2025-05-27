import React from 'react'

export default function WeatherInfoContainer(props) {
    return (
        //container for selected city weather info
        <div className = "weather-info-container">
            <div className = "weather-info-header">Weather Info</div>
            <div className = "weather-info-content">
                <div className = "weather-info-item">{props.weatherInfo.humidity}%</div>
                <div className = "weather-info-item">{props.weatherInfo.feels_like}°</div>
                <div className = "weather-info-item">{props.weatherInfo.weather[0].wind_speed}mph</div>
                <div className = "weather-info-item">{props.weatherInfo.weather[0].wind_gust}mph</div>
            </div>
        </div>
    )
}