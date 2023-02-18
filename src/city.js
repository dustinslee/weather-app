export class City {
  constructor(id, locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, windSpeed, description, time , lat, lon) {
    this.id = id;
    this.locId = locId;
    this.name = name;
    this.state = state;
    this.country = country;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.temp = temp;
    this.hiTemp = hiTemp;
    this.loTemp = loTemp;
    this.windSpeed = windSpeed;
    this.desc = description;
    this.time = time;
    this.lat = lat;
    this.long = lon;
  }
}
