window.onload = function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let datevar = document.getElementById("datevar");
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e62c28be53f712ae84fa26a7c1ca4269";
    let Curcityicon = document.getElementById("Curcityicon");
    let windspeed = document.getElementById("windspeed");
    let humidityval = document.getElementById("humidityval");

    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;


        let urlw =
            api +
            "?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiKey +
            "&units=metric";

        fetch(urlw)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const icon = `https://openweathermap.org/img/wn/${
       data.weather[0]["icon"]}@2x.png`;
                let temp = data.main.temp;
                document.getElementById("windimg").style.visibility = "visible";
                document.getElementById("humidityimg").style.visibility = "visible";
                document.getElementById("ulcurruntcity").style.visibility = "visible";

                temperature.innerHTML = Math.round(temp) + "° C";
                console.log(data.dt)
                datevar.innerHTML = new Date(data.dt * 1000).toLocaleString();
                location.innerHTML =
                    data.name + ", " + data.sys.country;
                description.innerHTML = "Feels like " + Math.round(data.main.feels_like) + "° C, " + data.weather[0].description;
                Curcityicon.src = icon;
                Curcityicon.alt = data.weather[0].main;
                windspeed.innerHTML = data.wind.speed + "m/s"

                humidityval.innerHTML = data.main.humidity + " %"
            });
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }
}