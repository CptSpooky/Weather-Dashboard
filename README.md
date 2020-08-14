# Weather Dashboard

## Objective
Create a weather dashboard where the user can search cities, see the current weather and a 5 day forecast.

## Description
[App Link](https://cptspooky.github.io/Weather-Dashboard/)

![image desktop](https://user-images.githubusercontent.com/66426144/89092236-ef74bf80-d37d-11ea-867f-24255cdc3660.png)

### List
To start, everything is wrapped in document.ready function so the DOM is ready for JavaScript code to execute safely. The next function listens for the search button click and passes the input value, in this case a city, into the parameters of the searchWeather function which creates a list with the city names.

![image List](https://user-images.githubusercontent.com/66426144/89112740-85b7ec80-d435-11ea-8366-d81184e41b0a.png)

### UV Index
Calls on OpenUv's API and passes the latitude and longitude parameters (in this case they're coordinates) we get from the weather searchWeather function into the query so that we can grab the actual UV index of the user inputed city. Conditionals are used to determine UV safety levels with colors.

![image UVIndex](https://user-images.githubusercontent.com/66426144/89112749-ab44f600-d435-11ea-8f06-f48b7394ca5c.png)

### Current Weather
Calls on OpenWeather's API to search the user inputed city, create a locally saved history and generate html to display the city name, date, temperature, an icon of the current weather, humidity, and windspeed. The UV index was added to the html in its own function. 

![image currentweather](https://user-images.githubusercontent.com/66426144/89112756-d891a400-d435-11ea-8d1a-3019ceca39b4.png)

### 5 Day Forecast
Passes the modified user input to find the city called in OpenWeather's 5 day forecast API. A loop is created to generate the date, temp, humidity for each day at 15:00. In order to get the date right, I had to convert the unix time stamp pulled from the API into a friendlier format. 

![image forecast](https://user-images.githubusercontent.com/66426144/89112762-ea734700-d435-11ea-8fe3-a1bdeecb49bb.png)

## Technology Used
* Javascript
* JQuery
* OpenUV API
* Open Weather API
* AJAX
* HTML
* CSS

## Credits
[OpenUV](https://www.openuv.io/)
[OpenWeather](https://openweathermap.org/)
[Mozilla Developer](https://developer.mozilla.org/)
[W3Schools](https://w3schools.com)
[Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
[Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw)
