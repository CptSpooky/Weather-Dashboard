

$(document).ready(function() {
  
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();

    //clear input box
    $("#search-value").val("");

    searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
   
    $(".history").append(li);
  }
  //uv index API
  function getUVIndex(lat, lng) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('x-access-token', '05b20cf8a7d8b9b2c7d72b65ca1febc1');
      },
      url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng,
      success: function(data) {
        console.log(data);
        //handle successful response
        var clrClass = "uvGreen";
        var uvNum = parseFloat(data.result.uv);
        if (uvNum > 6) {
          //severe
          clrClass = "uvRed";

        } else if (uvNum > 3) {
          //moderate
          clrClass = "uvYellow";
        }
        
        uvNum = Math.round(uvNum * 10) / 10;
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm " + clrClass).text(uvNum);
        
        // change color depending on uv value
        $("#today").append(uv.append(btn));
      },
      error: function(data) {
        // handle error response
      }
    });
   }

  function searchWeather(searchValue) {
    var apiSearchValue = searchValue.replace(" ", "+");
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + apiSearchValue + "&apikey=6180c555df72e359c9872e24a035077b",
      dataType: "json",
      success: function(data) {
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
    
          makeRow(searchValue);
        }
        
        // clear any old content
        $("#today").empty();

        // create html content for current weather
        var tempConvert = Math.round((parseInt(data.main.temp) - 273.15) * 9/5 + 32);
        var location = $("<h3>").text(data.name + " " + "(" + moment().format('l') + ")"); 
        var iconCode = data.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var icon = $("<img>").attr("src", iconURL);
        location.append(icon);
        var temp = $("<p>").text("Temperature: " + tempConvert + "\xB0" + "F");
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + " m/s");
      
        // merge and add to page
        $("#today").append(location, temp, humidity, windSpeed);

        // call follow-up api endpoints
        getForecast(apiSearchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
  function getForecast(apiSearchValue) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast?q=" + apiSearchValue + "&apikey=6180c555df72e359c9872e24a035077b",
      dataType: "json",
      success: function(data) {
        console.log(data);
        // overwrite any existing content with title and empty row
        $("#forecast").empty();
      

        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < data.list.length; i++) {
          // only look at forecasts around 3:00pm
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // Time converter
            var unixTimestamp = data.list[i].dt;
            var milliseconds = unixTimestamp * 1000;
            var dateObject = new Date(milliseconds);
            var convertedTime = dateObject.toLocaleDateString();

            // html elements for a bootstrap card
            var card = $("<div>").addClass("card-body");
            var weather = data.list[i];
            var humidFore = $("<p>").text("Humidity: " + weather.main.humidity);
            var tempFore = $("<p>").text("Temp: " + Math.round((parseInt(weather.main.temp) - 273.15) * 9/5 + 32) + "\xB0" + "F");
            var iconCodeFore = weather.weather[0].icon;
            var iconURLFore = "http://openweathermap.org/img/wn/" + iconCodeFore + "@2x.png";
            var iconFore = $("<img>").attr("src", iconURLFore);
            var date = $("<h4>").text(convertedTime);

            // merge together and put on page
            card = card.append(date, iconFore, tempFore, humidFore);
            $("#forecast").append(card);
          }
        }
      }
    });
  }
  
  // get current history, if any
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});
