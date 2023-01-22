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




// //////////////////////

async function getCityInfo(cityName){
    let coords = []
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
    let location = await response.json();
    let myLat = location[0].lat;
    coords.push(myLat)
    console.log(myLat);
    let myLon = location[0].lon;
    coords.push(myLon)
    console.log(myLon);
    return coords
} 

async function getWeatherInfo(cityName){
    getCityInfo(cityName)
    .then(console.log(coords))
};
/////////////////////////

// Function to convert lat/lon to city
// async function getWeatherInfo(cityName){

//     async function getCityInfo(){
//         let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
//         let location = await response.json();
//         let myLat = location[0].lat;
//         console.log(myLat);
//         let myLon = location[0].lon;
//         console.log(myLon);
//         return location
//     }  

//     console.log(getCityInfo(cityName))
//     let response2 = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityName.lat}&lon=${cityName.lon}&appid=${apiKey}`)
//     let cityInfo = await response2.json()
//     return cityInfo

// };




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
        cityTitle.innerHTML = location.name;

        
}