const container = document.querySelector('.container');
const search = document.querySelector('.searchBox button');
const weatherBox = document.querySelector('.tempDesc');
const weatherDetails = document.querySelector('.currently');
const error404 = document.querySelector('.oops');

search.addEventListener('click', () => {
    // storing api key to use in the fetch
    const APIkey = '11e4b4f812e7f93861e61012ba68dcc5';
    const city = document.querySelector('.searchBox input').value;

    if (city === '')
        return;
    // fetch to turn the given zip code into coordinates
    fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${city}&appid=${APIkey}`)
    .then(response => response.json())
    .then((data) => {
        const lat  = data.lat;
        const lon = data.lon;

        // the fetch getting the weather based off user input
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = "none";
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.currently img');
            const temp = document.querySelector('.temperature');
            const desc = document.querySelector('.desc');
            const mugCity = document.querySelector('.humidity span');
            const wind = document.querySelector('.wind span');

            if (json.weather && json.weather.length > 0){
                // switch case to change the image based on the weather
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = './assets/images/sunny.png';
                        break;

                    case 'Rain':
                        image.src = './assets/images/rainy.png';
                        break;

                    case 'Drizzle':
                        image.src = './assets/images/rainy.png';
                        break;

                    case 'Snow':
                        image.src = './assets/images/snowy.png';
                        break;

                    case 'Clouds':
                        image.src = './assets/images/cloudy.jpg';
                        break;

                    case 'Fog':
                        image.src = './assets/images/foggy.png';
                        break;

                    default:
                        image.src = '';
                }

                temp.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
                desc.innerHTML = `${json.weather[0].description}`;
                mugCity.innerHTML =`${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Mph`;
    
                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                container.style.height = '700px';
    
            } else {
                container.style.height = '590px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
            }
        }).catch((error) => {
            console.error('Error getting data:', error);
        });
    })
});