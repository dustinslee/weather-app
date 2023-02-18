import { City } from './city'

export class LocationList {
  constructor() {
    this.recent = [];
    this.home = [];
    this.nextId = 0;
  }
  
  addToRecent(locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, speed, weather, time, lat, lon) {
    const city = new City(
      ++this.nextId, locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, speed, weather[0].description, 
      time, lat, lon
    );
    this.recent.push(city);
  }

  remove(locId) {
    this.recent = this.recent.filter(loc => loc.id != locId);
  }
}