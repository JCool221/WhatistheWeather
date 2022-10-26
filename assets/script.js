var jumboDisp = $('#jumboDisp');
var jumboTime = $('#rightNow');
var jumboWeather = $('#jumboWeather');
var locationSearch = $('#locationSearch');
var buttonBox = $('#buttonBox');
var cardBox = $('#cardBox');
var latitude;
var longitude;
var histLoc;

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    jumboTime.text(rightNow);
}     

//   handler to launch search
locationSearch.submit(function(event) {
    // alert($('input').first().val());
    event.preventDefault();
    cardBox.empty();
    var location = ($('input').first().val());
    
    // save location to local memory and write a button to re-search it
    var locArray = [localStorage.getItem('loc')];
    var locString = [location];
    var storedItem = locArray.concat(locString);
    localStorage.setItem('loc', locString);

        var newButton = $('<button>');
        newButton.addClass('location-button');
        newButton.attr('data-location', location);
        newButton.text(location);
        buttonBox.append(newButton);
   
    
    // placeholder responses
    jumboDisp.text(location);
    // log location and get geocode
    console.log(location);
    if (location) {
        getGeocode(location);
        
    }
    locationSearch.each(function(){
        this.reset();
    });    
});    

// get geocode
// data is looking at a local file, rename var?

var getGeocode = function(location) {
    // geocoding api
    var apiUrl=('http://api.openweathermap.org/geo/1.0/direct?q='+location+'&limit=1&appid=d1d5e85e2e78ecf3d96e1c2539356352')            
    fetch(apiUrl)
    .then(function (response) {
        console.log(response);
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
var getWeather = function () {
    var apiKey = 'd1d5e85e2e78ecf3d96e1c2539356352'
    var weatherUrl = ('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey+'&units=imperial');
    fetch(weatherUrl)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        var iconcode = (data.weather[0].icon);
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl).css('visibility','visible');
        jumboWeather.text("Current temperature:"+ (data.main.temp)+('° ')+" Humidity:"+(data.main.humidity)+('% ')+" Wind Speed:"+(data.wind.speed)+('mph'));
    })
}
var getForecast = function () {
    var apiKey = 'd1d5e85e2e78ecf3d96e1c2539356352'
    var weatherUrl = ('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid='+apiKey+'&units=imperial');
    fetch(weatherUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.list[0].dt_txt);
            for ( let i = 0; i < 5; i++) {
                var foreCard=$('<div>');
                foreCard.addClass('card');
                foreCard.text((data.list[i].dt_txt));
                foreCard.append('<i>'+'icon'+'</i>');
                var foreCardList=$('<ul>');
                foreCard.append(foreCardList);
                    foreCardList.append('<li>'+'Temp: '+(data.list[i].main.temp)+'°');
                    foreCardList.append('<li>'+'Wind: '+(data.list[i].wind.speed)+ 'mph');
                    foreCardList.append('<li>'+'Humidity: '+(data.list[i].main.humidity)+'%');
                cardBox.append(foreCard);
            }
        })
}

// timers
setInterval(displayTime, 1000);
window.onload = function historical() {
    histLoc = localStorage.getItem('loc');
    console.log(histLoc);
}
