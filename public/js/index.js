
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    
    fetch('/getWeather?adress=' + location).then((response) => {
        
        response.json().then((data) => {
            if(data.error) {
              return messageOne.textContent = data.error
            } 
            locationData = data.locationData
            weatherData  = data.weatherData
            messageOne.textContent = locationData['place']
            messageTwo.textContent = weatherData['summary']
            messageThree.textContent = `It is currently ${weatherData['temperature']} degree Celcius \n
            with ${Math.round(weatherData['rainProbability'])}% chance of rain`
            
        })
    })
})