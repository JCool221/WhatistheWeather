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
// button not appending just adding text to buttonbox.div

        var newButton = $('<button>');
        newButton.addClass('location-button');
        newButton.attr('data-location', location);
        newButton.text(location);
        buttonBox.append(location);
   
    
    // placeholder responses
    jumboDisp.text(location);
    jumboWeather.text("It's Cold and it will continue to be cold for at least 5 more days");
    // log location and get geocode
    console.log(location);
    // if (location) {
        //     getGeocode(location);
        
        // }
        locationSearch.each(function(){
            this.reset();
        });    
    });    
    
    // get geocode data
    // var getGeocode = function(place) {
        //     // geocoding api
        //     var apiUrl = 'http://api.positionstack.com/v1/forward?access_key=2e80fdd7df87b970a960084bf0805ce6&query=' + place + '&limit=1&output=json';
        //     console.log(apiUrl);
        //     fetch(apiUrl)
        //     .then(function (response) {
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function (data) {
//                 console.log(data, place);
//                 console.log(data[i]);
//                 for (var i = 0; i < data.length; i++) {
//                     console.log(data[i].latitude);
//                     console.log(data[i].longitude);
//                 }

//             });
//         } else {
//             alert('Error: ' + response.message)
//         }
//     })
//         .catch(function (error) {
//              alert('Unable to find location');
//         });
// };

// timers
setInterval(displayTime, 1000);