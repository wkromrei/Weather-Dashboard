



const searchedLocations = JSON.parse(localStorage.getItem('allCities')) || [];
previouslySearchedEl = document.getElementById('history');




 const searchHistory = function (){
    for(let i = 0; i < searchedLocations.length; i++){
        const searchedContainer = document.createElement('button')
        searchedContainer.classList = 'w-100 previous-search';
        searchedContainer.textContent = `${searchedLocations[i]}`;
        previouslySearchedEl.append(searchedContainer);
        searchedContainer.addEventListener("click", function(){
            getWeather()
        } );
 }};
 searchHistory()
async function getWeather(){
    let city = document.getElementById("city").value
    searchedLocations.push(city);
    localStorage.setItem('allCities', JSON.stringify(searchedLocations));

    const searchedContainer = document.createElement('button')
    searchedContainer.classList = 'w-100 previous-search';
    searchedContainer.textContent = `${city}`;
    previouslySearchedEl.append(searchedContainer);
    
    const fiveDayForecast = document.getElementById('fiveDayForecast');
    const forecast = document.getElementById('forecast');
    const bigFirstCard = document.getElementById('bigFirstCard');
    bigFirstCard.textContent = ""
    forecast.textContent = ""
    const APIkey = "9d255a9b735d4fb0704a54b600d7fdfb";
    const geoqueryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=5&appid=${APIkey}`;
    
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
    // var day6 = createWeatherCard(weatherResponse.list[39])

    forecast.appendChild (day1)
    forecast.appendChild (day2) 
    forecast.appendChild (day3) 
    forecast.appendChild (day4) 
    forecast.appendChild (day5)
    // forecast.appendChild (day6)  

//    takes var day1 out and styles it

    const bigCard = document.createElement('div');
    bigCard.appendChild(day1); 
    bigCard.classList = 'id="day1card" text-center p-3 ml-3 mr-3';
    bigFirstCard.prepend(bigCard);

}
document.getElementById("btn-search").addEventListener("click", async function(){

getWeather()

})

function createWeatherCard (weatherData) {
    let container = document.createElement("div");
    container.classList.add("card-container");
    console.log(container)
    const forecast = document.getElementById("searched-cities");
    while(forecast.hasChildNodes()){
        forecast.removeChild(forecast.firstChild)
    };

    
    container.appendChild(document.createElement("h3")).textContent=`${new Date(weatherData.dt_txt).toLocaleDateString()}`
    container.appendChild(document.createElement("h5")).textContent=`Temp is ${weatherData.main.temp}°F`
    container.appendChild(document.createElement("h5")).textContent=`Humidity is ${weatherData.main.humidity}%`
    container.appendChild(document.createElement("h5")).textContent=`Feels like ${weatherData.main.feels_like}°F`
    container.appendChild(document.createElement("h5")).textContent=`Wind speed ${weatherData.wind.speed}MPH`
    

    return container

    
}


