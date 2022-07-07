

class Storage {
    constructor() {
        this.locations;
        this.defaultLocations = ['Sydney', 'Melbourne', 'Tampa', 'Miami']
    }

getLocations() {
    if(localStorage.getItem('locations') === null) {
        this.locations = [];
        // console.log(this.locations);
        this.locations = this.defaultLocations;
        $('#locModal').modal('show');
        return this.locations;
        } else {
            this.locations = JSON.parse(localStorage.getItem('locations'));
            console.log(this.locations);
            return this.locations
        };
}

addLocations() {
    console.log(JSON.stringify(selectedLocations));
    localStorage.setItem('locations', JSON.stringify(selectedLocations));
}

clearAllLocations() {
    localStorage.clear();
}

clearSpecificLocation(locationCard) {
    this.locations = JSON.parse(localStorage.getItem('locations'));
    console.log('Location to Remove ' + locationCard);
    console.log(this.locations);
    const locationCardPosition = this.locations.indexOf(locationCard);
    console.log('Position on Array ' + locationCardPosition + ' ' + this.locations);
    const newLocations = this.locations.splice(locationCardPosition,1);
    console.log(this.locations);
    localStorage.clear();
    localStorage.setItem('locations', JSON.stringify(this.locations));
}

replaceSpecificLocation(cardToReplace, selectedLocations) {
    this.locations = JSON.parse(localStorage.getItem('locations'));
    console.log('Location to Remove ' + cardToReplace);
    console.log('From this list of locations ' + this.locations);
    console.log('Location/s to add ' + selectedLocations + ' ' + typeof(selectedLocations) + ' ' + selectedLocations.length);
    const locationCardPosition = this.locations.indexOf(cardToReplace);
    console.log('Position on Array ' + locationCardPosition + ' ' + this.locations);
    var newLocations = this.locations.splice(locationCardPosition, 1);
    for(var i=0; i<selectedLocations.length; i++) {
        this.locations.push(selectedLocations[i]);
    };
    localStorage.clear();
    localStorage.setItem('locations', JSON.stringify(this.locations));
}
}



