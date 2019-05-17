document.getElementById('get_city').addEventListener('input', async function(event) {
    event.preventDefault();
    try {
        let city_name = document.getElementById('city_name').value;
        let response = await fetch('http://127.0.0.1:8090/search?city_name=' + city_name, {
            method: 'GET'
        });

        if (response.ok) {
            let text = await response.text();
            let cities = JSON.parse(text);
            document.getElementById('cities').innerHTML = '<p>Autocomplete results:</p><p>';
            document.getElementById('cities').innerHTML += `<b>${cities[0].title}</b><br>`;
            for (let i = 1; i < cities.length; i++) {
                document.getElementById('cities').innerHTML += cities[i].title + '<br>';
            }
            document.getElementById('cities').innerHTML += '</p>';
        } else {
            throw new Error('no input given ' + response.code);
        }
    } catch (error) {
        document.getElementById('cities').innerHTML = ' <p> There is no city name like that. </p>';
    }
});

document.getElementById('get_city').addEventListener('submit', async function(event) {
    event.preventDefault();
    try {
        let city_name = document.getElementById('city_name').value;
        try {
            var response = await fetch('http://127.0.0.1:8090/search?city_name=' + city_name, {
                method: 'GET'
            });
        } catch (error) {
            alert('It looks like the server is offline! Restart it and try again.');
        }
        if (response.ok) {
            document.getElementById('cities').innerHTML = '<br>Results loading...';
            let text = await response.text();
            let cities = JSON.parse(text);
            let city = cities[0].title;
            response = await fetch('http://127.0.0.1:8090/city?city_name=' + city, {
                method: 'GET'
            });
            let body = await response.text();
            let details = JSON.parse(body);
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let bits = details.time.substring(0, 10).split('-');
            let date = bits[2] + '-' + months[bits[1] - 1] + '-' + bits[0];
            document.getElementById('info').innerHTML =
                `<p>
                    Date: ${date} <br>
                    Time: ${details.time.substring(11,16)}
                </p>
                <p>
                ${details.title} is in ${details.parent.title}
                </p>`;
            document.getElementById('place').innerHTML = 'Forecast for ' + details.title;
            document.getElementById('sunrise').innerHTML =
                `<p>Sunrise: ${details.sun_rise.substring(11,16)}</p>`;
            document.getElementById('sunset').innerHTML =
                `<p>Sunset: ${details.sun_set.substring(11,16)}</p>`;
            document.getElementById('forecast-1').innerHTML =
                `<p><h3>Today </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[0].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[0].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[0].the_temp)}°C <br>
                </p>`;
            document.getElementById('forecast-2').innerHTML =
                `<p><h3>Tomorrow </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[1].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[1].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[1].the_temp)}°C <br>
                </p>`;
            let parts = details.consolidated_weather[2].applicable_date.split('-');
            let dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            let dayOfWeek = dateObj.getDay();
            document.getElementById('forecast-3').innerHTML =
                `<p><h3>${days[dayOfWeek]} </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[2].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[2].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[2].the_temp)}°C <br>
                </p>`;
            parts = details.consolidated_weather[3].applicable_date.split('-');
            dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            dayOfWeek = dateObj.getDay();
            document.getElementById('forecast-4').innerHTML =
                `<p><h3>${days[dayOfWeek]} </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[3].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[3].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[3].the_temp)}°C <br>
                </p>`;
            parts = details.consolidated_weather[4].applicable_date.split('-');
            dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            dayOfWeek = dateObj.getDay();
            document.getElementById('forecast-5').innerHTML =
                `<p><h3>${days[dayOfWeek]} </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[4].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[4].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[4].the_temp)}°C <br>
                </p>`;
            parts = details.consolidated_weather[5].applicable_date.split('-');
            dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
            dayOfWeek = dateObj.getDay();
            document.getElementById('forecast-6').innerHTML =
                `<p><h3>${days[dayOfWeek]} </h3><br>
                    <img src='https://www.metaweather.com/static/img/weather/${details.consolidated_weather[5].weather_state_abbr}.svg' alt='${details.consolidated_weather[0].weather_state_name}' width='50%'> <br>
                    ${details.consolidated_weather[5].weather_state_name} <br>
                    Temp: ${Math.round(details.consolidated_weather[5].the_temp)}°C <br>
                </p>`;
            document.getElementById('cities').innerHTML = '';
        } else {
            document.getElementById('cities').innerHTML = 'Try typing a city name.';
        }
    } catch (error) {
        document.getElementById('cities').innerHTML = 'That is not a city name.';
    }
});