const APIkey = "ed20fb4adbe514bcdaa55d24889b81bd"
const city = document.getElementById('citySearch')
const searchButton = document.getElementById('searchBtn')
const fiveDayForecastRow = document.getElementById('fiveDayTemp')

// function mainApiURL() {
//     currentCity = city.value;
//     console.log('you just searched for', currentCity );

//     let latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=1&appid=${APIkey}`

//     fetch(latlonURL)
//         .then(function (responce) {
//            return responce.json();
//         })
//         .then(function(data){
//             return data[0];
//         })
//         .then(function(apiArray) {
//             let lat = apiArray.lat;
//             let lon = apiArray.lon;

//             let fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`;
//              console.log(fiveDayUrl)
//              return fiveDayUrl
//         })
    
// }

function currentWeather()

function fiveDayForecast() {

    currentCity = city.value;
    fiveDay = []

    console.log('you just searched for', currentCity );

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

            let fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`;
             console.log(fiveDayUrl)
             return fiveDayUrl
            
             fetch(fiveDayUrl)
                .then(function(responce){
                    return responce.json();
                })
                .then(function(data){
                    
                   return data.list;   
                })
                .then(function(hourArray){
                    for (let i = 0; i < hourArray.length; i+=8) {

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
    fiveDayForecast();
})


// fetch(welcomeQueryURL)
//   .then(function (responce) {
//     return responce.json();
//   })
//   .then(function (data) {
//     return data.results;
//   })
//   .then(function (movieresults) {
//     let randommovie =
//       movieresults[Math.floor(Math.random() * movieresults.length)];
//     let movieID = String(randommovie?.id);

//     //url call for movie that will be displayed
//     let selectedMovieURL =
//       "https://api.themoviedb.org/3/movie/" +
//       movieID +
//       "?api_key=" +
//       APIKey +
//       "&language=en-US&append_to_response=release_dates,watch/providers";

//     // fetching dada from Movie database
//     fetch(selectedMovieURL)
//       .then(function (responce) {
//         return responce.json();
//       })
//       .then(function (data) {
//         console.log(data);

//         //parcing and creating poster url for display
//         let posterPath = data.poster_path;
//         console.log(posterPath);
//         let selectedMoviePoster =
//           "https://image.tmdb.org/t/p/w500" + posterPath;
//         console.log(selectedMoviePoster);

//         //parcing movie data(poster img, title, synopsis, genre, runtime) to be displayed on site
//         let posterIMG = document.createElement("img");
//         posterIMG.src = selectedMoviePoster;
//         document.getElementById("poster").append(posterIMG);

//         let title = document.createElement("h1");
//         title.textContent = data.title;
//         document.getElementById("movieTitle").append(title);

//         let synopsis = document.createElement("p");
//         synopsis.textContent = data.overview;
//         document.getElementById("shortSynop").append(synopsis);

//         let genre = document.createElement("h6");
//         genre = data.genres[0].name + "/" + data.genres[1].name;
//         document.getElementById("shortSynop").append(genre);

//         let runtime = document.createElement("h6");
//         runtime = " " + data.runtime + " minutes";
//         document.getElementById("shortSynop").append(runtime);
//       });
//   });

// const ManagerCard = manager => {
//     return `<div class="card employee-card m-5">
//     <div class="card-header bg-primary">
//         <h2 class="card-title">${manager.name}</h2>
//         <h3 class="card-title">${manager.getRole()}</h3>
//     </div>
//     <div class="card-body">
//         <ul class="list-group">
//             <li class="list-group-item">ID: ${manager.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
//             <li class="list-group-item">Office number: ${manager.officeNumber}</li>
//         </ul>
//     </div>
// </div>`;
// };

// teamDeck = (team) => {
//     const teamInput = [];
    
//         teamInput.push(team
//             .filter(employee => employee.getRole() === "Manager")
//             .map(manager => ManagerCard(manager))
//         );
//         teamInput.push(team
//             .filter(employee => employee.getRole() === "Engineer")
//             .map(engineer => EngineerCard(engineer))
//             .join("")
//         );
//         teamInput.push(team
//             .filter(employee => employee.getRole() === "Intern")
//             .map(intern => InternCard(intern))
//             .join("")
//         );
//     const compiledTeam = teamInput.join("");
    
//     const finalteam = maintemplate(compiledTeam);
    
//     return finalteam;
//     }

// addManager()
// .then(addTeamMember)
//     .then(roster => {
//         return templates(roster);
//     })
//     .then(HTML => {
//         writeFile(HTML)
//     })
//   .catch(err => {
//  console.log(err);
//   });