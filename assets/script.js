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
        var apiUrl=('http://api.openweathermap.org/geo/1.0/direct?q=lansing&limit=5&appid=d1d5e85e2e78ecf3d96e1c2539356352')            
            fetch(apiUrl)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data.results);
                }

            );
        }
//         } else {
//             alert('Error: ' + response.message)
//         }
//     })   ' + location + '
//         .catch(function (error) {
//              alert('Unable to find location');
//         });
// };

// timers
setInterval(displayTime, 1000);
