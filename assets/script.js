var jumboDisp = $('#jumboDisp');
var jumboTime = $('#rightNow');
var jumboWeather = $('#jumboWeather');

function test() {
    jumboDisp.addText
}

// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    jumboTime.text(rightNow);
  } 

$('#locationSearch').submit(function(event) {
    // alert($('input').first().val());
    event.preventDefault();
    var location = ($('input').first().val());
    jumboDisp.text(location);
    jumboWeather.text("It's Cold and it will continue to be cold for at least 5 more days");
    console.log(location);
    if (location) {
        getGeocode(location);

    }
});


var getGeocode = function(place) {
    // geocoding api
    var apiUrl = 'http://api.positionstack.com/v1/forward?access_key=2e80fdd7df87b970a960084bf0805ce6&query=' + place + '&limit=1';
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                console.log(data.type);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].latitude);
                    console.log(data[i].longitude);
                }

            });
        } else {
            alert('Error: ' + response.message)
        }
    })
        .catch(function (error) {
             alert('Unable to find location');
        });
};
// timers
setInterval(displayTime, 1000);