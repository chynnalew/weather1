import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function kelvinToF(k){
  return ((k - 273.15) * 9/5 + 32);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const location = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?${$("#input").val()}=${location}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status === 404) {
        alert('City not found!');
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in the place is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in F is function ${kelvinToF(response.main.temp)} degrees.`);
      $('.cloudCover').text(`The clouds are ${response.weather[0].description}.`);
      $('.windSpeed').text(`The wind speed is ${response.wind.speed}.`);
      $('.showName').text(`${response.name}`);
    }
  });
});