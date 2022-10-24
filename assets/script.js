var jumboDisp = $('#jumboDisp');
var jumboTime = $('#rightNow');
var jumboWeather = $('#jumboWeather');
var locationSearch = $('#locationSearch');
var buttonBox = $('#buttonBox');


function test() {
    var startButton = $('<button>');
    startButton.addClass('start-btn');
    startButton.text('start');
    buttonBox.append(startButton)
}    


// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    jumboTime.text(rightNow);
}     

//   handler to launch search
locationSearch.submit(function(event) {
    // alert($('input').first().val());
    event.preventDefault();
    var location = ($('input').first().val());
    
    // save location to local memory and write a button to re-search it
    var locString = JSON.stringify(location);
    console.log(locString);
    localStorage.setItem('loc', locString);

        var newButton = $('<button>');
        newButton.addClass('location-button');
        newButton.attr('data-location', location);
        newButton.text(location);
        buttonBox.append(newButton);
   
    
    // placeholder responses
    jumboDisp.text(location);
    jumboWeather.text("It's Cold and it will continue to be cold for at least 5 more days");
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
            var latitude = (data[0].lat);
            var longitude = (data[0].lon);
            console.log(latitude, 'var');
            console.log(longitude, 'var');
        });

}

// timers
setInterval(displayTime, 1000);
function history() {
    localStorage.getItem('loc');
    console.log(loc);
}
