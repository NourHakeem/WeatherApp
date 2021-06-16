window.onload = function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let datevar = document.getElementById("datevar");
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "e62c28be53f712ae84fa26a7c1ca4269";

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
                let temp = data.main.temp;
                temperature.innerHTML = Math.round(temp) + "° C";
                console.log(data.dt)
                datevar.innerHTML = new Date(data.dt * 1000).toLocaleString();
                location.innerHTML =
                    data.name;
                description.innerHTML = data.weather[0].main;
            });
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }
}