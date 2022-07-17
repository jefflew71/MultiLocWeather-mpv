class UI {
    constructor() {
        // Current Weather
        this.location = document.getElementById('w-location');
        this.currentTemp = document.getElementById('w-current-temp');
        this.currentDesc = document.getElementById('w-current-desc');
        this.currentDescIcon = document.getElementById('w-current-desc-icon');
        this.currentHumidity = document.getElementById('w-current-humidity');
        this.currentWind = document.getElementById('w-current-wind');
        // Forecast Day 1
        this.day1DescIcon = document.getElementById('day1-desc-icon');
        this.day1Date = document.getElementById('day1-date');
        this.day1Temp = document.getElementById('day1-temp');
        this.day1RainChance = document.getElementById('day1-rain-chance');
        this.day1MaxWind = document.getElementById('day1-max-wind');
        this.day1Humidity = document.getElementById('day1-humidity');
        this.day1SunsriseSunset = document.getElementById('day1-sunrise-sunset');
    };

    clearLocationCards() {
        const locationCards = document.getElementById('location-cards');
        locationCards.innerHTML = '';
    }

    clearSpecificLocationCard(locationCard) {
        storage.clearSpecificLocation(locationCard);
        this.clearLocationCards();
        buildLocationCards();
    };

    paintCurrentWeather(weather) {
        // Current Weather
        const locationCards = document.getElementById('location-cards');
        const locationCard = document.createElement('div');
        locationCard.classList.add('col', 'card', 'border-0', 'text-center', 'bg-light', 'mt-2', 'rounded');
        locationCard.innerHTML = `
            <div id="currentWeather" class= "card-header d-flex container{justify-content: space-between}">
                <h3 style="font-size:1.2vw" id="w-location">${weather.location.name}, ${weather.location.region}</h3>
                <div id="change-loc-card-btn-${weather.location.name}"
                <i class="fa-solid fa-square-pen"></i>
                </div>
                <div id="remove-loc-card-btn-${weather.location.name}"
                <i class="fa-solid fa-rectangle-xmark"></i>
                </div>
            </div>
            <div class="card-body mt-1">
                <h5 class="text-dark" id="w-current-temp">${weather.current.temp_f} F</h5>
                <h5 class="text-dark" id="w-current-desc">${weather.current.condition.text}</h5>
                <img id="w-current-desc-icon" src=${weather.current.condition.icon}>
                <h5 class="text-dark" id="w-current-humidity">${weather.current.humidity} Relative Humidity</h5>
                <h5 class="text-dark" id="w-current-wind">${weather.current.wind_mph} mph</h5>
            </div>
            <div id="w-forecast-${weather.location.name}" class="card border-0"></div>
        `;
        locationCards.appendChild(locationCard);
    };
    
    paintForecast(weather, location) {
        // Paint one card per forecast day per location
        const specificLocation = `w-forecast-${location}`;
        const forecastDays = document.getElementById(specificLocation);
        const forecastPerDay = document.createElement('div');
        const date = new Date(weather.date);
        const displayDate = (date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short'}));
        forecastPerDay.innerHTML = `
            <div class="card-header mt-1">
            <div class="align-items-sm-center">
                <img id="day1-desc-icon" class="card-img-top" src=${weather.day.condition.icon}>
                <h5 id="day1-date" style="color:dodgerblue">${displayDate}</h5>
            </div>
            <div class="card-body pb-1">
                <table class="table jusfity-left mx-1">
                    <tr>
                    <th>Temp<br>min/max</th>
                    <th>Rain %</th>
                    <th>Max Wind</th>
                    <th>RH</th>
                    <th>Sun<br>Rise/Set</th>
                    </tr>
                    <tr>
                    <td id="day1-temp">${weather.day.mintemp_f} / <br>${weather.day.maxtemp_f}</td>
                    <td id="day1-rain-chance">${weather.day.daily_chance_of_rain}</td>
                    <td id="day1-max-wind">${weather.day.maxwind_mph}</td>
                    <td id="day1-humidity">${weather.day.avghumidity}</td>
                    <td id="day1-sunrise-sunset">${weather.astro.sunrise} /<br>${weather.astro.sunset}</td>
                    </tr>
                </table>
            </div>
        </div>
        `;
        forecastDays.appendChild(forecastPerDay);
    
    }};
