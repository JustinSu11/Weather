import fetchCoordinatesFromName from "./weatherAPI/FetchCoordinatesFromName"

//Get the user's latitude and longitude using the browser's geolocation API and fetch weather info using the coordinates
//used on initial render

export default function fetchUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'))
            return
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const weatherInfo = await fetchCoordinatesFromName(position)
                resolve(weatherInfo)
            } catch (error) {
                console.error('Error fetching weather info:', error)
                reject(error)
            }
        }, (error) => {
            console.error('Error getting geolocation:', error)
            reject(error)
        })
    })
}