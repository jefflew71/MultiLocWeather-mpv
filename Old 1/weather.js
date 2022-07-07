class Weather {
    constructor(city, numOfDays, userInput) {
        this.options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': '65486415a3msh7b1f60b555ac08ep18db92jsne17dc2501e4c'
            }
        };
        this.city = city;
        this.numOfDays = numOfDays;
        this.userInput = userInput;
    }

    async getWeather() {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.city}&days=${this.numOfDays}`, this.options);
        const responseData = await response.json();
        return responseData;
    }

    async getLocation() {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${this.userInput}`, this.options);
        const nameList = await response.json();
        console.log(this.userInput);
        return nameList;
    }

    // Change weather location
    changeLocation(city) {
        this.city = city;
    }
}



