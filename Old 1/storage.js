class Storage {
    constructor() {
        this.cities;
        this.state;
        this.defaultCity = 'Sydney';
    }

    getLocationData() {
        if(localStorage.getItem('city') === null) {
            this.cities = [];
        } else {
            this.cities = JSON.parse(localStorage.getItem('cities'));
        }
        return {
            city: this.cities,
        }

    }

    addLocationData(city) {
         document.getElementById('select-btn').addEventListener('click', (e) => {
            
            localStorage.push('city', cities);
        });      
        // $('#locModal').modal('hide');          
    }

    clearLocation() {
        localStorage.clear();
    }
}