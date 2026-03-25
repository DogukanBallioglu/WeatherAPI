const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const api = "2c7b58cac80b5150ee3050d6bac6d3f8";

searchBtn.addEventListener("click", async () => {

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value.trim()}&appid=${api}&units=metric&lang=tr`
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const wind = data.wind.speed;
            const pressure = data.main.pressure;
            const d = new Date();
            const year = d.getFullYear();
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("degree").innerText = Math.round(data.main.temp);
            document.getElementById("description").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("feelsLike").innerText = Math.round(data.main.feels_like);
            document.getElementById("windSpeed").innerText = wind;
            document.getElementById("pressure").innerText = pressure;
            document.getElementById("date").innerText = `${day}/${month}/${year}`

            fishingStatusFunction(wind, pressure);
            document.getElementById("weatherResult").style.display = "block";
        } else {
            alert("Şehir bulunamadı!" + data.message);
        }

    } catch (error) {
        console.log("Hata oluştu:", error);
    }

})


async function fishingStatusFunction(wind, pressure) {

    let status = document.getElementById("fishingStatus");

    if (pressure >= 1016 && pressure <= 1022 && wind < 5) {
        status.innerText = "Mükemmel! Balıklar şu an çok aktif, hemen oltanı kap!";
        status.style.color = "green";
        
    } else if (pressure >= 1025 || wind > 10) {
        status.innerText = "Pek iyi değil. Balıklar derine kaçmış olabilir veya rüzgar çok sert.";
        status.style.color = "red";

    } else {
        status.innerText = "Orta seviye bir hava. Şansını deneyebilirsin.";
        status.style.color = "gray";

    }
}



