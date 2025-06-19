let apiKey = "*************************";

    let input = document.getElementById("cityInput");
    let divEle = document.getElementById("weatherResult");

    const getWeather = async () => {
      let city = encodeURIComponent(input.value.trim());
      if (!city) {
        divEle.innerHTML = "<p>Please enter a city name.</p>";
        return;
      }

      let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        divEle.innerHTML = `<div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            
          </div>
        </div>`;
        let response = await fetch(API_URL);
        let data = await response.json();

        if (data.cod !== 200) {
          divEle.innerHTML = `<p>❗City not found. Try again.</p>`;
        } else {
          showWeather(data);
        }
      } catch (error) {
        divEle.innerHTML = `<p>Error fetching weather data.</p>`;
        console.error(error);
      }
    };

    const showWeather = (data) => {
      divEle.innerHTML = `
        <div>
          <p><strong>City:</strong> ${data.name}</p>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div>`;
    };
