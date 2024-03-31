
// Objectives: need to store and display searched locations under city/state <input>'s. 
// need to style  5 day forecast in cards, and add more queries like humidity and wind. 
// the present day needs to be in a card centered. 
// after every time the function is rendered, I need to clear the results. 



// let searchedLocations = JSON.parse(localStorage.getItems('locations'));
let allCities = []



document.getElementById("btn-search").addEventListener("click", async function(){
    
    let city = document.getElementById("city").value
// here, insert search city to local storage

    const searchDisplay = document.getElementById('searched-cities');
    const APIkey = "9d255a9b735d4fb0704a54b600d7fdfb";
    const geoqueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=5&appid=${APIkey}`;
    
    var geoResult = await fetch (geoqueryURL);
    var geoResponse = await geoResult.json();
    console.log({geoResponse})
    var geoData = geoResponse[0]
    
    const Lon = geoData.lon;
    const Lat = geoData.lat;
    
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lon}&appid=${APIkey}&units=imperial`;
    
    var weatherResult = await fetch (queryURL);
    var weatherResponse = await weatherResult.json();

    console.log({weatherResponse})

    var day1 = createWeatherCard(weatherResponse.list[0])
    var day2 = createWeatherCard(weatherResponse.list[8])
    var day3 = createWeatherCard(weatherResponse.list[16])
    var day4 = createWeatherCard(weatherResponse.list[24])
    var day5 = createWeatherCard(weatherResponse.list[32])
    var day6 = createWeatherCard(weatherResponse.list[39])

    searchDisplay.innerHTML += day1
    searchDisplay.innerHTML += day2 
    searchDisplay.innerHTML += day3 
    searchDisplay.innerHTML += day4 
    searchDisplay.innerHTML += day5
    searchDisplay.innerHTML += day6  
})

function createWeatherCard (weatherData) {
    let container = `<div class="card-container">`
    container += `<h3>${new Date(weatherData.dt_txt).toLocaleDateString()}</h3>`
    container += `<h5>Temp is ${weatherData.main.temp}</h5>`
    container += `<h5>Humidity is ${weatherData.main.humidity}</h5>`
    container += `<h5>Feels like ${weatherData.main.feels_like}</h5>`
    container += `<h5>Wind speed is ${weatherData.wind.speed}</h5>`
    container +="</div>"

    return container
}





        // fetch(geoqueryURL)
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (data) {
        //     console.log(data);

            
        //     fetch(queryURL)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (data) {
        //         console.log(data);
        //     });
        // });
   
// how do I grab information from first fetch to use it in second fetch, and only run this fetch when 
// second fetch has successfully run. 



// Other objectives: 
// How do I create 5 HTML cards that display the 5 day forecast. 
// How do I display the current forecast above the 5 cards in a larger card. 
// How do I display the recently searched for cities under my <input>. Something to do with "persistent data"
// 




// teacher starter code that throws errors
// function init() {
    


//     if (searchedLocations.length === 0) {
//         return;
//     }
//     for(const location of searchedLocations) {
//     }
// }
//     init();