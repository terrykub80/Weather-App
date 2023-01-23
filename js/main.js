console.log('==========')
let apiKey = 'fdee9c00e3ed32e6057eeaa4b5fbfa42'



let form = document.getElementById('cityForm')
console.log(form);



async function handleFormSubmit(e){
    e.preventDefault(); // Prevent event from refreshing page
    console.log(e)
    let cityName = e.target.cityName.value;
    console.log(cityName);

    let cityInfo = await getWeatherInfo(cityName);
    console.log(cityInfo);
    buildWeatherCard(cityInfo);

    // Clear the input box at the end
    e.target.cityName.value = '';
};


// add event listner to form
form.addEventListener('submit', handleFormSubmit);




// Function to convert lat/lon to city and get city info
async function getWeatherInfo(cityName){    
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
        let location = await response.json();
        let myLat = location[0].lat;
        let myLon = location[0].lon;
        let response2 = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${myLat}&lon=${myLon}&appid=${apiKey}`)
        cityDetails = await response2.json()
        return cityDetails
};  





function buildWeatherCard(cityInfo){
    console.log(cityInfo)

    let card = document.createElement('div')
    card.className = 'card h-100';

        // Create a top image for card
        let image = document.createElement('img')
        image.className= 'card-img-top'
        image.src = 'https://flagcdn.com/w320/ca.png';
        // Add image as a child to the card
        card.append(image);

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body';

        let cityTitle = document.createElement('h5');
        cityTitle.className = 'card-title';
        cityTitle.innerHTML = cityDetails.cityName;

        let cityDescription = document.createElement('p');
        cityDescription.className = 'card-text';
        cityDescription.innerHTML = `Today's Weather: ${cityInfo.current.weather[0].description}`;

        let cityCurrent = document.createElement('p');
        cityCurrent.className = 'card-text';
        cityCurrent.innerHTML = `Current Temp: ${((cityInfo.current.temp - 273.15)*1.8+32).toFixed(2)}`;

        let cityFeelLike = document.createElement('p');
        cityFeelLike.className = 'card-text';
        cityFeelLike.innerHTML = `Feels Like: ${((cityInfo.current.feels_like - 273.15)*1.8+32).toFixed(2)}`;

        let cityHigh = document.createElement('p');
        cityHigh.className = 'card-text';
        cityHigh.innerHTML = `Today's High: ${((cityInfo.daily[0].temp.max - 273.15)*1.8+32).toFixed(2)}`;

        let cityLow = document.createElement('p');
        cityLow.className = 'card-text';
        cityLow.innerHTML = `Today's Low: ${((cityInfo.daily[0].temp.min - 273.15)*1.8+32).toFixed(2)}`;

        cardBody.append(cityTitle);
        cardBody.append(cityDescription);
        cardBody.append(cityCurrent);
        cardBody.append(cityFeelLike);
        cardBody.append(cityHigh);
        cardBody.append(cityLow);

        card.append(cardBody);

        let col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3 my-3';

        col.append(card);

        let display = document.getElementById('weatherDisplay');
        display.append(col);


};

        