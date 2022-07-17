class Weather {
    constructor(location, userInput) {
        this.options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': '65486415a3msh7b1f60b555ac08ep18db92jsne17dc2501e4c'
            }
        };
        this.location = location;
        this.userInput = userInput;
    }

    async getWeather() {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.location}&days=3`, this.options);
        const responseData = await response.json();
        return responseData;
    }

    async pickLocation() {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${this.userInput}`, this.options);
        const locationList = await response.json();
        return locationList;
    }
}