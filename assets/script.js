const jumboDisp = $('#jumboDisp');
const jumboTime = $('#rightNow');
const jumboWeather = $('#jumboWeather');
const locationSearch = $('#locationSearch');
const buttonBox = $('#buttonBox');
const cardBox = $('#cardBox');

// handle displaying the time
function displayTime() {
    let rightNow = moment().format('MMM DD, YYYY [at] hh:mm a');
    jumboTime.text(rightNow);
}     

//   handler to launch search
locationSearch.submit(function(event) {
    event.preventDefault();
    // cardBox.empty();
    let location = ($('input').first().val());
    
    // save location to local memory and write a button to re-search it
    let locArray = [localStorage.getItem('loc')];
    let locString = [location];
    let storedItem = locArray.concat(locString);
    localStorage.setItem('loc', locString);

        let newButton = $('<button>');
        newButton.addClass('location-button');
        newButton.attr('data-location', location);
        newButton.text(location);
        buttonBox.append(newButton);
   
    
    // placeholder responses
    jumboDisp.text(location);
    // log location and get geocode
    if (location) {
        getGeocode(location);
        
    }
    locationSearch.each(function(){
        this.reset();
    });    
});    

// get geocode
// data is looking at a local file, rename let?

const getGeocode = function(location) {
    // geocoding api
    let apiUrl=('https://api.openweathermap.org/geo/1.0/direct?q='+location+'&limit=1&appid=d1d5e85e2e78ecf3d96e1c2539356352')            
    fetch(apiUrl)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        // geocodeFound(data, location)
        latitude = (data[0].lat);
        longitude = (data[0].lon);
        
    })
    .then (function(latitude, longitude) {
        getWeather(latitude, longitude);
        getForecast(latitude, longitude);
    });
    
}
// get weather
const getWeather = function () {
    cardBox.empty();
    let apiKey = 'd1d5e85e2e78ecf3d96e1c2539356352'
    let weatherUrl = ('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey+'&units=imperial');
    fetch(weatherUrl)
    .then(function(response) {
        // console.log(response);
        return response.json();
    })
    .then(function(data) {
        let iconcode = (data.weather[0].icon);
        let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl).css('visibility','visible');
        jumboWeather.text("Current temperature:"+ (data.main.temp)+('° ')+" Humidity:"+(data.main.humidity)+('% ')+" Wind Speed:"+(data.wind.speed)+('mph'));
    })
}
const getForecast = function () {
    let cardCount = 0
    let apiKey = 'd1d5e85e2e78ecf3d96e1c2539356352'
    let weatherUrl = ('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid='+apiKey+'&units=imperial');
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            let uniqueDates = [];
            for ( let i = 0; i < data.list.length && cardCount < 5; i++) {
                let date = (data.list[i].dt_txt.split(' '))
                let day = (date[0].substring(8,10))

                // check for uniqueness of date
                if (uniqueDates.includes(day)) {
                    continue;
                }

                let foreCard=$('<div>');                
                foreCard.addClass('card');
                foreCard.text((date[0]));

                let iconcode = (data.list[i].weather[0].icon);
                let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                foreCard.append('<img src='+iconurl+'>');

                let foreCardList=$('<ul>');
                foreCard.append(foreCardList);
                    foreCardList.append('<li>'+'Low: '+(data.list[i].main.temp_min)+'°');
                    foreCardList.append('<li>'+'High: '+(data.list[i].main.temp_max)+'°');
                    foreCardList.append('<li>'+'Wind: '+(data.list[i].wind.speed)+ 'mph');
                    foreCardList.append('<li>'+'Humidity: '+(data.list[i].main.humidity)+'%');
                cardBox.append(foreCard);
                cardCount++

                uniqueDates.push(day)
            }
        })
}

// timers
setInterval(displayTime, 1000);

// load history and create button
window.onload = function historical() {
    histLoc = localStorage.getItem('loc');
    // console.log(histLoc);
    let newButton = $('<button>');
    newButton.addClass('location-button');
    newButton.text(histLoc);
    buttonBox.append(newButton);
}

// event listener on the buttonBox
buttonBox.on('click', '.location-button', function() {
    // console.log(histLoc)
    let location = histLoc
    getGeocode(location);
})