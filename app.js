const storage = new Storage();
const userInput = document.getElementById('searchLocation');
const ui = new UI();
var locationSelectionHolding = [];
var selectedLocations = [];
var cardToReplace = '';

buildLocationCards();

// Calling functions to get weather and forecast and paint the UI
function buildLocationCards() {
    const locations = storage.getLocations();
    locations.forEach(function(location) {
        const weather = new Weather(location);
        weather.getWeather()
        .then(results => {
            console.log(results);
            ui.paintCurrentWeather(results);
            document.getElementById(`remove-loc-card-btn-${results.location.name}`).addEventListener('click', (e) => {
                ui.clearSpecificLocationCard(results.location.name);
            })
            document.getElementById(`change-loc-card-btn-${results.location.name}`).addEventListener('click', (e) => {
                cardToReplace = results.location.name;
                $('#locModal').modal('show');       
            })
            const forecast = results.forecast.forecastday
            forecast.forEach(function(forecast) {
                ui.paintForecast(forecast, location)
            });
        })
    });
}
// Search & Create a List of Filtered (best matching) locations in the modal
userInput.addEventListener('keyup', (e) => {
    const userInput = e.target.value;
    const locations = new Weather(location, userInput);
    if(userInput !== '') {
        locations.pickLocation()
        .then(locationList => {
            if(locationList.length === 0) {
                console.log('nothing found')
            } else {
                let output = '<option selected>Select one or more and click "Add"</option>';
                locationList.forEach(function(locationList) {
                    output += `
                        <option value=${locationList.name}>${locationList.name}, ${locationList.region}, ${locationList.country}</option>
                    `;
                });
                document.getElementById('locationsToSelect').innerHTML = output;      
            }
        });
    } else {
        let output = '<option selected>Select one or more and click "Add"</option>'; 
        document.getElementById('locationsToSelect').innerHTML = output;
    }
});

// Select Location from List of Filtered Locations and save to holding array
const userSelectedLocation = document.getElementById('locationsToSelect');
userSelectedLocation.addEventListener('click', async (e) => {
    const userSelectedLocation = e.target.value;   
    locationSelectionHolding.push(userSelectedLocation);
});

// Add selected location/s to the final array that will be added to storage
document.getElementById('add-btn').addEventListener('click', (e) => {
    selectedLocations.push(locationSelectionHolding[0]);
    locationSelectionHolding = [];
    document.getElementById('locationsToSelect').innerHTML = '';
    userInput.value = '';
});

// Store all the selected locations to LS and display weather
document.getElementById('done-btn').addEventListener('click', (e) => {
    ui.clearLocationCards();
    if(cardToReplace !== "") {
        storage.replaceSpecificLocation(cardToReplace, selectedLocations);
    } else {
        storage.clearAllLocations();
        storage.addLocations(selectedLocations);
        };
    selectedLocations = [];
    cardToReplace = '';
    buildLocationCards();
});

// Refresh/update the current weather and forecast of the saved locations
document.getElementById('refresh-weather-btn').addEventListener('click', (e) => {
    ui.clearLocationCards();
    buildLocationCards();
});
