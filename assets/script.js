const apiKey = '18e7ae3a1f608e812d465476189f028c'
const latitude = '47.6062'
const longitude = '-122.3321'
const searchedCity = document.getElementById('city-search')
// const submitBtn = document.body.getElementsByClassName('form-sub-btn')
const submitBtn = document.querySelector('.form-sub-btn');
// const formSection = document.body.getElementsByClassName('form-section')
const underForm = document.querySelector('.form-section')
const currForecastDiv = document.getElementsByClassName('searched-city-section')
// const city = searchedCity.value

// const mainSection = document.querySelector('.city-search-section')

const currWeather = document.querySelector(".city-search-section")


// pick up here

function fetchForecast(lat, long){

const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`


    fetch(baseUrl)
    .then((response) => response.json())
    // save it to local storage and display
    .then(data => {
        console.log(data, "Found it!");
        console.log(data.list[0].weather);
        // const date = data.list[0].dt_txt}, 
        console.log(data.list[0].weather),
        console.log(data.list[0].dt_txt)
        const containers = document.querySelectorAll('.date')
        
        const urlicon = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.img`
        const divider = document.createElement('div')
        const currWeatherSection = document.createElement('h3')
        const cityNameT = document.createElement('h1')
        const dateT = document.createElement('h3')
        const temp = document.createElement('h3')
        const humidity = document.createElement('h3')
        const windSpeed = document.createElement('h3')
        const icon = document.createElement('img')
        icon.setAttribute('src', `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`)
        // icon.textContent = urlicon
        // data.list[0].weather[0].icon
        windSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed}`
        windSpeed.setAttribute('class', 'readable')
        humidity.textContent = `Humidity: ${data.list[0].main.humidity}`
        humidity.setAttribute('class', 'readable')
        temp.textContent = `Temp: ${data.list[0].main.temp}`
        temp.setAttribute('class', 'readable')
        dateT.textContent = data.list[0].dt_txt
        dateT.setAttribute('class', 'readable city-spacing')
        cityNameT.textContent = data.city.name
        cityNameT.setAttribute('class', 'readable city-spacing')
        currWeatherSection.textContent = data.list[0].weather[0].main
        currWeatherSection.setAttribute('class', 'readable position')
        currWeather.appendChild(cityNameT)
        currWeather.appendChild(dateT)
        divider.appendChild(temp)
        divider.appendChild(humidity)
        divider.appendChild(windSpeed)
        divider.appendChild(icon)
        divider.setAttribute('class', 'readable move-up')
        currWeather.appendChild(divider)
        // currWeather.appendChild(currWeatherSection)
        // currWeather.appendChild(temp)
        // currWeather.appendChild(humidity)
        // currWeather.appendChild(windSpeed)
        // currWeather.appendChild(icon)
       
        

        for (let i = 1; i < containers.length; i++){
            containers[i].setAttribute('class', 'date')
            containers[i].textContent = data.list[i*4].dt_txt
            const cardSection1 = document.createElement('h3')
            const cardSection2 = document.createElement('h3')
            cardSection1.textContent = data.list[i].weather[0].main,
            cardSection2.text = data.list[i].wind.speed
            cardSection1.setAttribute('class', 'weather-display')
            cardSection2.setAttribute('class', 'weather-display')
            containers[i].appendChild(cardSection1)
            containers[i].appendChild(cardSection2)
            
        }


        // unicode to add icons based on weather
        for (let i = 0; i < containers.length; i++){
            let rain = 'U+26C6';
            let sun = 'U+2609';
            if ((data.list[i].weather[i].main) === 'Rain') {
                cardSection1.textContent += parseInt(rain)
            } else {
                cardSection1.textContent += parseInt(sun)
            }
        }
})
    .catch(`Url is not working, response: ${baseUrl.status}`) 

        const weatherHeader = document.createElement('header')
        // currWeather.createElement('header')
        weatherHeader.setAttribute('class', 'date')
        weatherHeader.textContent = JSON.stringify(data.list[0].dt_txt)
        currWeather.appendChild(weatherHeader)

        // function getDate(data) {
        //     console.log(data + "hjkcjdnxbfbecd")
        
        // }
        // getDate(data)
        // return date
}




function setLatandLong(cityName){
    const cityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    fetch(cityApi)
        .then((response) => response.json())
        .then(data => {
            fetchForecast(data[0].lat, data[0].lon)})
        // replace console.log with data.syntax
        .catch(`Url is not working, response: ${cityApi.status}`)
        // const city = searchedCity.value
    }

// Renders to the aside section recently searched cities by creating a button element for each
// figure out how to have all of the cities entered saved to an array so it can be stored in localStorage and rendered to screen in recently viewed section 
// const cityInputs = JSON.parse('inputCity')
const userInput = [] || cityInputs
function NewSearchedCity() {

    const newRecentSearchBtn = document.createElement('button')
    newRecentSearchBtn.textContent = searchedCity.value
    console.log(searchedCity.value)
    newRecentSearchBtn.setAttribute('class', 'recent-search1')
    
    // don't create a new div, target the precendent 
    underForm.appendChild(newRecentSearchBtn)

    userInput.push(searchedCity.value)
    // console.log(userInput)

    
    }

    function init() {
        // renders recently searched buttons globally
        // NewSearchedCity()
        storeCityInput()
        // console.log("init")
    }
    init()
    
// submitBtn[0].addEventListener("click", NewSearchedCity);
// newRecentSearchBtn.innerHTML = ''

function clearTextInput() {
    // searchedCity.value = " "
}
// const city = searchedCity.value


submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearTextInput();
    NewSearchedCity();
    storeCityInput();
    fiveDayForecast();
    setLatandLong(searchedCity.value);
});


function storeCityInput() {
    let userInput = document.querySelector('#city-search').value;
    let newSearches = JSON.parse(localStorage.getItem('inputCity')) || [];
    newSearches.push(userInput);
    localStorage.setItem('inputCity', JSON.stringify(newSearches));
}

// no longer used 
// Dynamically insert data into the divs that represent the 5-day weather forecast based on entered city 
// userSearchDate = '6/10/2024'
// use response.(date)
// change the hard coded date to date of when the user makes the search
function fiveDayForecast(response) {
    console.log(response)
    const date = new Date();
    const todaysDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    console.log(todaysDate)
    let attachedNum;
    for (let i = 1; i < 6; i ++){
        attachedNum = JSON.stringify(i)
        console.log(attachedNum)
        const dateField = document.getElementById(`date${attachedNum}`) 
        console.log(typeof(todaysDate))
       
        console.log(dateField)
        const fHeader = document.createElement('header')
        fHeader.setAttribute('class', 'date center')
        fHeader.textContent = todaysDate
        dateField.appendChild(fHeader)
     

    }
 
}



function displaySearchInForecastDiv() {
    const forecastHeader = currForecastDiv.createElement('header')
    forecastHeader.textContent = searchedCity.value
    currForecastDiv.appendChild(forecastHeader)
}


