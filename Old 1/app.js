// Instantiate storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

const userInput = document.getElementById('searchLocation');

// Instantiate Weather Object
const weather = new Weather(weatherLocation.city, '3', userInput);

// Instantiate UI object
const ui = new UI();

// Get weather on DOM Load
document.addEventListener('DOMContentLoaded', getWeather);

// Search & Filter location event
userInput.addEventListener('keyup', (e) => {
    const userInput = e.target.value;
    const location = new Weather(weatherLocation.city, '3', userInput);
    console.log(location);
    if(userInput !== '') {
        location.getLocation()
        .then(names => {
            if(names.length === 0) {
                console.log('nothing found')
            } else {
                let output = '<option selected>Select one or more and click "Add"</option>';
                names.forEach(function(name) {
                    output += `
                        <option value=${name.name}>${name.name}, ${name.region}, ${name.country}</option>
                    `;
                });
                document.getElementById('locationsToSelect').innerHTML = output;
                console.log(names);
                console.log('X', userInput);
            }
        });
    } else {
        let output = '<option selected>Select one or more and click "Add"</option>'; 
        document.getElementById('locationsToSelect').innerHTML = output;
    }
});

// Select Location
const selectedLocation = document.getElementById('locationsToSelect');

selectedLocation.addEventListener('click', async (e) => {
    const selectedLocation = e.target.value;
    // console.log(selectedLocation);
    await storage.addLocationData(selectedLocation);
    await weather.changeLocation(selectedLocation);
    await getWeather();
    // $('#locModal').modal('hide');
});


// Get and display weather
function getWeather() {
    weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
    .catch(err => console.log(err));
}

// document.getElementById('w-change-btn').addEventListener('click', (e) => {
//     const city = document.getElementById('city').value;
//     weather.changeLocation(city);