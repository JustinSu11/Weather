import React from 'react'

// import css
import './WeatherInfoContainer.css'

export default function WeatherInfoContainer(props) {
    return (
        //container for selected city weather info
        <div className = "weather-info-container">
            <div className = "weather-info-header">Weather Info</div>
            <div className = "weather-info-content">
                <div className = "weather-info-item">
                    <div className="weather-info-item-title">
                        <p>Humidity</p>
                    </div>
                    <div className="weather-info-item-content">
                        {props.weatherInfo.current.humidity}%
                    </div>
                </div>
                <div className = "weather-info-item">
                    <div className="weather-info-item-title">
                        <p>Feels Like</p>
                    </div>
                    <div className="weather-info-item-content">
                        {Math.round(props.weatherInfo.current.feels_like)}°
                    </div>
                </div>
                <div className = "weather-info-item">
                    <div className="weather-info-item-title">
                        <p>Wind Speed</p>
                    </div>
                    <div className="weather-info-item-content">
                        {props.weatherInfo.current.wind_speed}mph
                    </div>
                </div>
            </div>
        </div>
    )
}