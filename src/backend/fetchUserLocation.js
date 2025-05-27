import fetchCoordinatesFromName from "./weatherAPI/FetchCoordinatesFromName"

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