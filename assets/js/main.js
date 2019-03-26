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
                this.createTemplateCurrent()
                this.showDailyForecast()
            })
    }

    formatDateNow() {
        let data = this.weatherData;
        let timeNow = data.currently.time;
        let timeNowUTC = new Date(timeNow * 1000);
        let dayNowFormatted = moment(timeNowUTC).format('dddd, MMMM Do YYYY');
        let hourNowFormatted = moment(timeNowUTC).format(' hh:mm a');
        let timeNowFormatted = `
        <div class="today">${dayNowFormatted}</div>
        <div class="now">${hourNowFormatted}</div>`
        return timeNowFormatted;
    }

    createTemplateCurrent() {
        let weather = this.weatherData;
        let currentTime = this.formatDateNow();
        console.log(weather)
        let template = `
            <h2>${weather.timezone}</h2>
            <h3>Today</h3>
            <div class="current-time">${currentTime}</div>
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
                    <div class="col-5">
                    </div>
                    <div class="col-5">
                        <small>${weather.currently.summary}</small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 h4">
                        <i class="wi wi-thermometer h4"></i> 
                    </div>
                    <div class="col-5">
                       ${weather.currently.temperature} °C
                    </div>
                    <div class="col-5 small">
                       apparent: ${weather.currently.apparentTemperature} °C
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 h4">
                        <i class="wi wi-strong-wind"></i> 
                    </div>
                    <div class="col-5">
                        ${weather.currently.windSpeed} km/h 
                    </div>
                    <div class="col-5 small">
                        gusts: ${weather.currently.windGust} km/h
                    </div>
                </div>
            </div>
        `
        document.querySelector('#currentWeather').innerHTML = template
    }

    showDailyForecast() {

        let dailyForecast = this.weatherData.daily.data;
        let forecastArray = new Array(dailyForecast);
        let dailyForecastOutput = forecastArray.forEach(weatherData => {
            let forecastArrayLength = weatherData.length
            let template = ``;
            for (let i = 0; i < forecastArrayLength; i++) {
                template += `Hello ${weatherData[i].time} `;
            }
            console.log(template)
        })

    }
}

let showWeather = new ShowWeatherInfo()