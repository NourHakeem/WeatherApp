const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "e62c28be53f712ae84fa26a7c1ca4269";

form.addEventListener("submit", e => {
    e.preventDefault();
    const listItems = list.querySelectorAll(".ajax-section .city");
    const inputVal = input.value;
    const lat = 48.13;
    const lon = 11.58;
    //ajax here
    //const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&lat={lat}&lon={lon}&exclude={part}&&appid=${apiKey}&units=metric`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;



    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});