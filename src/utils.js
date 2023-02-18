export default function kelvinToFahrenheit(num) {
  num = parseFloat(num);
  return Math.round(((num-273.15)*1.8+32));
}

export function fahrenheitToCelsius(num) {
  num = parseFloat(num);
  return Math.round((num-32)/1.8);
}