export async function fetchData(city) {
    console.log("Button clicked, fetching data...");

    const location = city;
    try {
        const weatherData = await getWeather(location); // Wait for weather data
        console.log("returning from fetchData");
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null; // Return null or handle the error as needed
    }
}

function getWeather(location) {
    const apiKey = '5179943790412546d5501fb308a6219c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=imperial`;
    console.log("getting request");
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("returning from getWeather");
            return data; // Return JSON data directly
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            throw error; // Rethrow the error to be caught by fetchData
        });
}