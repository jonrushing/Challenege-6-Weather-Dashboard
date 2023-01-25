const APIkey = "ed20fb4adbe514bcdaa55d24889b81bd"
const city = document.getElementById('citySearch')
const searchButton = document.getElementById('searchBtn')
const fiveDayForecastRow = document.getElementById('fiveDayTemp')

//function that first grabs the longitude and latitude of the city input 
function currentWeather() {
    
    currentCity = city.value;

    let latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=1&appid=${APIkey}`

    fetch(latlonURL)
        .then(function (responce) {
           return responce.json();
        })
        .then(function(data){
            return data[0];
        })
        .then(function(apiArray) {
            let lat = apiArray.lat;
            let lon = apiArray.lon;

            //Takes the lon and lat and places it into the api url to get the current day weather
            let currentDayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`;
             console.log(currentDayUrl) 

             fetch(currentDayUrl)
                .then(function(responce){
                    return responce.json();
                })
            //takes that current weather data and parses each attribute into its proper place on the card    
                .then(function(data){
                    let title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
                    let img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                    let temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
                    let humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                    let wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            
                    //combines all elements into one card        
                    $("#forecast").append(title, img, temp, humid, wind);
                   
                })
        })
}
//same sort of thing as current weather funtion this time getting the data for a five day forecast
function fiveDayForecast() {

    fiveDay = []
    currentCity = city.value;
    console.log('you just searched for', currentCity );
//getting the log and lat for the inputted city from the api
    let latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=1&appid=${APIkey}`

    fetch(latlonURL)
        .then(function (responce) {
           return responce.json();
        })
        .then(function(data){
            return data[0];
        })
        .then(function(apiArray) {
            let lat = apiArray.lat;
            let lon = apiArray.lon;
//taking that log and lat and plugging it into the weather api
            let fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`;
             console.log(fiveDayUrl)

                fetch(fiveDayUrl)
                .then(function(responce){
                    return responce.json();
                })
                .then(function(data){
                    
                   return data.list;   
                })
                .then(function(hourArray){
                    for (let i = 0; i < hourArray.length; i+=8) {

//parsing the data from the api call and placing each attribute into its proper place
                            let titleFive = $("<h3>").addClass("card-title").text(new Date(hourArray[i].dt_txt).toLocaleDateString());
                            let imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + hourArray[i].weather[0].icon + ".png");
                            let colFive = $("<div>").addClass("col-md-2.5");
                            let cardFive = $("<div>").addClass("card bg-primary text-white");
                            let cardBodyFive = $("<div>").addClass("card-body p-2");
                            let humidFive = $("<p>").addClass("card-text").text("Humidity: " + hourArray[i].main.humidity + "%");
                            let tempFive = $("<p>").addClass("card-text").text("Temperature: " + hourArray[i].main.temp + " °F");
                  
                            //merge together and put on page
                            colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, humidFive)));
                            //append card to column, body to card, and other elements to body
                            $("#fiveDayTemp").append(colFive);
                          }
                        })
                    })
                }

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    currentWeather();
    fiveDayForecast();
})