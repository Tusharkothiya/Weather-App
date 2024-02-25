const form = document.querySelector(".form");




form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const weather = async () => {
    try {
      let city = document.querySelector(".city").value;
      let city_name = document.querySelector("#city-name");
      let old_date = document.querySelector("#para");
      let temprature_desc = document.querySelector(".temp-temp");
      let temprature = document.querySelector(".temp");
      let wind_speed = document.querySelector(".speed");
      let humidity = document.querySelector(".huminity");
      let visibility = document.querySelector(".vs-distance");
      let cityBlank = document.querySelector(".city");
      let icon = document.querySelector(".change-icon");
      cityBlank.value = "";

      if (city === "") {
        city_name.innerHTML = "Enter City Name ";
        return;
      }

      let key = "936c572e8f2b21c946678879b1371ce4";
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
      
      const data = await fetch(URL);

      if (!data.ok) {
        city_name.textContent = city + " not exist";
        throw new Error("Please Provide Correct City name..............");
      }
      const finalData = await data.json();
      console.log(finalData);

      

      city_name.textContent = finalData.name;
      const currentData = new Date();
      old_date.textContent = currentData.toDateString();
      temprature_desc.textContent = finalData.weather[0].description;
      temprature.textContent = `${Math.round(finalData.main.temp)}°`;
      wind_speed.textContent = `${finalData.wind.speed} KW/H`;
      humidity.textContent = `${finalData.main.humidity}%`;
      visibility.textContent = `${finalData.visibility / 1000} KM/H`;
      const iconName = getIcon(finalData.weather[0].main);
    //   console.log(iconName);
      icon.innerHTML = `<i class="material-icons change-icon">${iconName}</i>`;

    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  weather();
});

let getIcon = (weatherData) =>{
    const icon = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return icon[weatherData];
}