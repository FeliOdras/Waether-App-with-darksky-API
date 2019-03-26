class ShowWeatherInfo {
    constructor() {
        this.apiUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d84cb7f6921da1e86c703e59f2dc5da3/52.520008,13.404954?units=si`;
        this.fetchData();
    }

    fetchData() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => {
                this.weatherData = data;
                this.createTemplateCurrent();
                // this.showForecast(this.weatherData.daily.data)
            })
    }

    formatDate(array) {
        let data = array;
        let timeNow = data.time;
        let timeUTC = new Date(timeNow * 1000);
        return timeUTC;
    }

    createTemplateCurrent() {
        let weather = this.weatherData;
        let currentTime = this.formatDate(weather.currently);
        let template = `
            <h2>${weather.timezone}</h2>
            <h3>Today</h3>
            <div class="current-time">${moment(currentTime).format('dddd, MMMM Do YYYY')}<br>
            <span class="currentHour">${moment(currentTime).format('hh:mm a')}</span></div>
            <div class="current-weather row">
                <div class="summary col-md-3 col-sm-12">
                <div class="row">
                    <div class="col-2">
                        <i class="h4 wi ${
                            weather.currently.icon === 'clear-day' ? 'wi-day-sunny' :
                            weather.currently.icon === 'clear-night' ? 'wi-night-clear' :
                            weather.currently.icon === 'partly-cloudy-day' ? 'wi-day-cloudy' :
                            weather.currently.icon === 'partly-cloudy-night' ? 'wi-night-alt-cloudy' :
                            weather.currently.icon === 'cloudy' ? 'wi-cloudy' :
                            weather.currently.icon === 'rain' ? 'wi-rain' :
                            weather.currently.icon === 'sleet' ? 'wi-sleet' :
                            weather.currently.icon === 'snow' ? 'wi-snow' :
                            weather.currently.icon === 'wind' ? 'wi-cloudy-gusts' :
                            weather.currently.icon === 'fog' ?  'wi-fog' :
                            'wi-na'
                        }">
                        </i>
                    </div>
                    <div class="col-10">
                        ${weather.currently.summary}
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 h4">
                        <i class="wi wi-thermometer h4"></i> 
                    </div>
                    <div class="col-10">
                       ${weather.currently.temperature} °C
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 h4">
                        <i class="wi wi-rain"></i> 
                    </div>
                    <div class="col-10">
                        ${weather.currently.precipProbability} % 
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 h4">
                        <i class="wi wi-strong-wind"></i> 
                    </div>
                    <div class="col-10">
                        ${weather.currently.windSpeed} km/h 
                    </div>
                </div>
            </div>
        `
        document.querySelector('#currentWeather').innerHTML = template;
        this.addEventListeners();
    }

    showForecast(array, cssClass, headline) {
        let forecastArray = new Array(array)
        let template = ``;
        template += `<div class="${cssClass} row">`
        template += `<h3 class="col-12">${headline}</h3>`
        forecastArray.forEach(weatherData => {
            let forecastArrayLength = weatherData.length
            for (let i = 0; i < forecastArrayLength; i++) {
                let timeFormatted = this.formatDate(weatherData[i])
                template += `
                <div class="col-md-3 col-sm-6 col-12">
                   <div class="forecast-day">
                        ${moment(timeFormatted).format('dddd')}<br>
                        <span class="forecast-day small">${moment(timeFormatted).format('MMMM Do')}</span>
                    </div>
                    <div class="forecast-hour">
                        ${moment(timeFormatted).format('hh:mm a')}
                    </div>
                <div class="weather-icon">
                <i class="h4 wi ${
                    weatherData[i].icon === 'clear-day' ? 'wi-day-sunny' :
                    weatherData[i].icon === 'clear-night' ? 'wi-night-clear' :
                    weatherData[i].icon === 'partly-cloudy-day' ? 'wi-day-cloudy' :
                    weatherData[i].icon === 'partly-cloudy-night' ? 'wi-night-alt-cloudy' :
                    weatherData[i].icon === 'cloudy' ? 'wi-cloudy' :
                    weatherData[i].icon === 'rain' ? 'wi-rain' :
                    weatherData[i].icon === 'sleet' ? 'wi-sleet' :
                    weatherData[i].icon === 'snow' ? 'wi-snow' :
                    weatherData[i].icon === 'wind' ? 'wi-cloudy-gusts' :
                    weatherData[i].icon === 'fog' ?  'wi-fog' :
                    'wi-na'
                }">
                </i>
                </div>
                <span class="small">${weatherData[i].summary}</span>
                <div class="row">
                    <div class="col-3">
                        <i class="wi wi-thermometer"></i> 
                    </div>
                    <div class="col-9 small">
                    ${weatherData[i].temperature === undefined ? 
                        `
                        ${weatherData[i].temperatureMin} - ${weatherData[i].temperatureMax} °C
                       ` : `${weatherData[i].temperature} °C`}
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <i class="wi wi-rain"></i> 
                    </div>
                    <div class="col-9 small">
                       ${weatherData[i].precipProbability} %
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <i class="wi wi-strong-wind"></i> 
                    </div>
                    <div class="col-9 small">
                        ${weatherData[i].windSpeed} km/h 
                    </div>
                </div>
                </div>`;
            }
            template += `</div>`
            document.querySelector('#forecast').innerHTML = template;
        })

    }

    addEventListeners() {
        document.querySelector('#show-forecast-daily').addEventListener('click', () => this.showForecast(this.weatherData.daily.data, 'daily-forecast', '8 days forecast'))
        document.querySelector('#show-forecast-hourly').addEventListener('click', () => this.showForecast(this.weatherData.hourly.data, 'hourly-forecast', '48 hours forecast'))
    }
}

let showWeather = new ShowWeatherInfo()