

//var mymap = L.map('mapid', {zoomControl:false}).fitWorld();
var mymap = L.map('mapid', {zoomControl:false}).setView([51.505, -0.09], 5);
 
function main(){
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',{
 attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
 
    maxZoom:30,
    id: 'mapbox.streets',
	tileSize: 512,
      zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidmFpamF5YW50aSIsImEiOiJja2hxNnIyZWEzbjQ1MzVsNjF3N3F0dnk2In0.PcocR9U8lr2cjVCy_y3bCg'
  }).addTo(mymap);
      L.easyButton('<i class="fas fa-info-circle fa-lg"style="color:blue"></i>', () => {ShowGeneralInfo()}).addTo(mymap);
      L.easyButton('<i class="fas fa-sun fa-lg"style="color:Orange"></i>', () => {ShowWeather()}).addTo(mymap);
      L.easyButton('<i class="fas fa-cloud-sun-rain fa-lg" style="color:SlateGray"></i>', () => {ShowWeatherInfo()}).addTo(mymap);
	  L.easyButton('<i class="fas fa-coins fa-lg" style="color:Tan"></i>', () => {ShowCurrencyInfo()}).addTo(mymap);
      L.easyButton('<i class=" fa fa-clock fa-lg" style="color:Teal"></i>', () => {ShowTimeZone()}).addTo(mymap);
	  L.easyButton('<i class=" fa fa-moon fa-lg" style="color:SteelBlue"></i>', () => {ShowMoon()}).addTo(mymap);
	 L.easyButton('<i class="fas fa-virus fa-lg " style="color:red"></i>', () => {ShowCovid()}).addTo(mymap);
	 
	

   getCurrentCountry();
   getCountryList();
   //spin
  
   
   

}


//Country Variables
let countryName = '';
let population = 0;
let region = '';
let capital = '';
let cap = '';
let landMass = 0;
let exchangeRate = 0;
let countryGeoJson = [];
let area = 0;
let countryCode = '';
let cc = '';
let countryFlagLink = '';
let languages = [];
let callingCodes = [];
// weather variables
let temp = '';
let humidity ='';
let pressure ='';
let temp_max='';
let temp_min='';
let description='';
let icon ='';
let wind ='';
//sunrise and sunset variables
let sunrise='';
let sunset='';
//Time variables
let lat='';
let lng='';
let time = '';
//Moon variables
let moon_illumination='';
let moon_phase='';
let moonrise='';
let moonset='';
//Covid19 variables
let cases = '';
let active = '';
let critical = '';
let deaths = '';
let recovered = '';
let tests = '';
let todayCases ='';
let todayDeaths = '';
let todayRecoverd ='';
//News Variables
let srcImg ='';
let title ='';
let desc ='';
let url ='';
let srcImg1 ='';
let title1 ='';
let desc1 ='';
let url1 ='';
let srcImg2 ='';
let title2 ='';
let desc2 ='';
let url2 ='';
//Currency Variables
let currencyName = '';
let currencySymbol = '';
let gdpInfo = 0; 
let gdpGrowthInfo = 0;

//Weather Forecast Variables

//Weather Day1 1
let weatherDay1 = '';
let day1Conditions = '';
let day1Icon = '';
let day1Temp = 0;
let day1Wind =  0;
let day1Humidity = 0;
let day1Precip = 0;

//Weather Day 2
let weatherDay2 = '';
let day2Conditions = '';
let day2Icon = '';
let day2Temp = 0;
let day2Wind =  0;
let day2Humidity = 0;
let day2Precip = 0;


//Weather Day3 3
let weatherDay3 = '';
let day3Conditions = '';
let day3Icon = '';
let day3Temp = 0;
let day3Wind =  0;
let day3Humidity = 0;
let day3Precip = 0;



//country Border Variables
var geoJsonStyle = {
    "color": "#8B008B",
    "opacity": 1.0,
    "weight": 5,
}

var geoJsonLayer = [];
//Leaflet Spinner
 mymap.spin(true);
  let layer = L.geoJson().addTo(mymap);
      // Simulate AJAX
      setTimeout(function () {
          layer.addData(geoJsonLayer);
          mymap.spin(false);
      }, 1200);
//on map layer
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden.');
	london    = L.marker([51.50, 0.12]).bindPopup('This is London,Capital');
	delhi     = L.marker([28.70, 77.10]).bindPopup('This is Dehli,Capital');
	kabul     =  L.marker([34.28, 69.11]).bindPopup('This is Kabul,Capital');
	Tirane     =  L.marker([41.18, 19.49]).bindPopup('This is Tirane,Capital');
	algiers     =  L.marker([36.42, 3.8]).bindPopup('This is Algires,Capital');
	pago     =  L.marker([14.16, 170.43]).bindPopup('This is Pago Pago,Capital');
	androlla     =  L.marker([42.31, 1.32]).bindPopup('This is Androlla la Vella,Capital');
	luanda     =  L.marker([8.50, 13.15]).bindPopup('This is Luanda,Capital');
	west    =  L.marker([17.20, 61.48]).bindPopup('This is West Indies,Capital');
	Buens     =  L.marker([36.30, 60.00]).bindPopup('This is Buenos Aires,Capital');
	paris     =  L.marker([48.50, 2.20]).bindPopup('This is Paris,Capital');
	rome     =  L.marker([41.54, 12.29]).bindPopup('This is Rome,Capital');
	berlin    =  L.marker([52.30, 13.25]).bindPopup('This is Berlin,Capital');
	
	var cities = L.layerGroup([littleton, denver, aurora, golden,london,delhi,kabul,Tirane,algiers,pago,androlla,luanda,west,Buens,paris,rome,berlin]);
	//building different leaflet layers
   var sky = 
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
   {id: 'mapbox.streets', 
   tileSize: 512,
   zoomOffset: -1,
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom:30}),
	
     topomap  = 
   L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
   {id: 'mapbox.streets',
   tileSize: 512,
   zoomOffset: -1, 
   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
 
   solid  = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
   {id: 'mapbox.streets',
   tileSize: 512, 
   zoomOffset: -1,
   attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'});
   
   mini   = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
   {id: 'mapbox.streets', 
   tileSize: 512, 
   zoomOffset: -1, 
   attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
   
   
   
   national   = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', 
   {id: 'mapbox.streets', 
   tileSize: 512,
   zoomOffset: -1, 
   attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC</a>'});
   
   clouds   = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=1c3d9301fd719f6956782a77868e60ca', 
   {id: 'mapbox.streets', 
   tileSize: 512,
   zoomOffset: -1, 
   attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'});
   
   pressure   = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=1c3d9301fd719f6956782a77868e60ca',
   {id: 'mapbox.streets', 
   tileSize: 512, 
   zoomOffset: -1,
   attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'});
   
    wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=1c3d9301fd719f6956782a77868e60ca',
	{id: 'mapbox.streets', 
	tileSize: 512,
	zoomOffset: -1,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'});
	
	 temp = L.tileLayer('http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1c3d9301fd719f6956782a77868e60ca',
	{id: 'mapbox.streets', 
	tileSize: 512,
	zoomOffset: -1,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'});

  precipitation = L.tileLayer('http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1c3d9301fd719f6956782a77868e60ca',
	{id: 'mapbox.streets', 
	tileSize: 512,
	zoomOffset: -1,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'});
	


//var mymap = L.map('map', {
 //   center: [39.73, -104.99],
   // zoom: 10,
   // layers: [grayscale, cities]
//});
var baseMaps = {
    "Sky": sky,
    "Topomap": topomap,
	"Solid" : solid,
	"MiniMap":mini,
	
	"Main":national,
};

var overlayMaps = {
    "Cities": cities,
	"Weather_Rainfall":precipitation,
	"Weather_clouds":clouds,
	"Weather_Pressure":pressure,
	"Weather_Wind":wind,
	"Weather_Temprature":temp,
};
//var overlayMaps={
//	"weather_clouds":clouds,
//}
L.control.layers(baseMaps, overlayMaps,overlayMaps).addTo(mymap);


	
//function to get country List
function getCountryList(){
    $.ajax({
        url: 'libs/php/getCountryList.php',
        type: 'POST',
        dataType: 'JSON',
    success: (result) => {

        const selectElement = $('#countryInput');

        result['data'].forEach(country => {
            selectElement.append(`<option value=${country['code']}>${country['name']}</option>`)
        });
    }, error: (jqXHR, textStatus, errorThrown) => {
        console.warn(jqXHR.responseText)
        console.log(errorThrown);
       $('#loading').hide();
    }
})
}

function getCurrentCountry(){
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
               
  
                $.ajax({
                    url: 'libs/php/getCountry.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        currency: '',
                    },
                    success: (result) => {
                        //console.log(result);

                        if(result.status.name == "ok"){
                            countryName = result['CountryInfo']['geonames'][0]['countryName'];
                            population = result['CountryInfo']['geonames'][0]['population'];
                            region = result['CountryInfo']['geonames'][0]['continentName'];
                            capital = result['RestCountries']['capital'];
							cap = result['CountryInfo']['geonames'][0]['capital'];
                            currency = result['CountryInfo']['geonames'][0]['currencyCode'];
                            if(result['CurrencyInfo']['error']) {
                                exchangeRate = "N/A"
                            } else {
                                exchangeRate = result['CurrencyInfo']['result'];
                            }
                            countryCode = result['CountryCode']['countryCode'];
							cc = result['CountryInfo']['geonames'][0]['countryCode']
                            area = result['CountryInfo']['geonames'][0]['areaInSqKm']
                            currencyName = result['RestCountries']['currencies'][0]['name'];
                            currencySymbol = result['RestCountries']['currencies'][0]['symbol'];
                            countryFlagLink = result['RestCountries']['flag'];
							borders = result['RestCountries']['borders'];
							timezones= result['RestCountries']['timezones'][0];
                            countryGeoJson =  result['geoJson'];
							//languages = result['RestCountries']['languages'];
                           
                           for(let i = 0; i < result['RestCountries']['callingCodes'].length; i++){
                               const callingCode = '+' + result['RestCountries']['callingCodes'][i];
                               callingCodes.push(callingCode);
                            }
                            
                            for(let i = 0; i < result['RestCountries']['languages'].length; i++){
                               languages.push(result['RestCountries']['languages'][i]['name']);
                            }

                            gdpInfo = result['Indicator'][1][0]['value'];
                            gdpGrowthInfo = result['IndicatorGrowth'][1][0]['value'];
                           //get lat and lng from weather Api
						      lat = result['WeatherInfo']['location']['lat'];
							  lng = result['WeatherInfo']['location']['lon'];
                            
                            setWeatherVars(result);
							 
                            getWeatherData(capital);
							
							
							CovidInfo(cc);
							TimeInfo(lat,lng);
							 
                            setLJSON("userCurrency", currency);
                            createGeoJson(countryGeoJson);
							
                            geoJsonLayer.bindTooltip(mapInfoDisplay()).toggleTooltip();
							
                            

                        }
                    },
		
                    error: (jqXHR, textStatus, errorThrown) => {
                       console.warn(jqXHR.responseText)
                        console.log(errorThrown);
                     
                    }
                });
            });
        };
};
function setCountryInformation(){
  

            $.ajax({
                url: 'libs/php/getCountry.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    countryCode: $('#countryInput').find(':selected').val(),
                    currency: getLJSON("userCurrency")
                },
                success: (result) => {
                   // console.log(result);
                    if(result.status.name == "ok"){
                        countryName = result['CountryInfo']['geonames'][0]['countryName'];
                        population = result['CountryInfo']['geonames'][0]['population'];
                        region = result['CountryInfo']['geonames'][0]['continentName'];
                        capital = result['RestCountries']['capital'];
						cap = result['CountryInfo']['geonames'][0]['capital'];
                        currency = result['CountryInfo']['geonames'][0]['currencyCode'];
                        if(result['CurrencyInfo']['error']) {
                            exchangeRate = "N/A"
                        } else {
                            exchangeRate = result['CurrencyInfo']['result'];
                        }
                        countryCode = $('#countryInput').find(':selected').val();
						cc = result['CountryInfo']['geonames'][0]['countryCode']
				
                        area = result['CountryInfo']['geonames'][0]['areaInSqKm'];
                        currencyName = result['RestCountries']['currencies'][0]['name'];
                        currencySymbol = result['RestCountries']['currencies'][0]['symbol'];
                        countryFlagLink = result['RestCountries']['flag'];
						borders = result['RestCountries']['borders'];
                        countryGeoJson =  result['geoJson'];
						languages = result['RestCountries']['languages'];

                        callingCodes = [];
                        for(let i = 0; i < result['RestCountries']['callingCodes'].length; i++){
                            const callingCode = '+' + result['RestCountries']['callingCodes'][i];
                            callingCodes.push(callingCode);
                        }
                        
                        languages = [];
                       for(let i = 0; i < result['RestCountries']['languages'].length; i++){
                           languages.push(result['RestCountries']['languages'][i]['name']);
                       }

                       if(result['Indicator'].length > 1){
                            gdpInfo = result['Indicator'][1][0]['value'];
                       } else {
                            gdpInfo = null;
                        }

                        if(result['IndicatorGrowth'].length > 1){
                            gdpGrowthInfo = result['IndicatorGrowth'][1][0]['value'];
                        } else {
                           gdpGrowthInfo = null;
                        }
                        //get lat and lng from weather Api
						     // lat = result['WeatherInfo']['location']['lat'];
							  //lng = result['WeatherInfo']['location']['lon'];
                        
                        setWeatherVars(result);
						getWeatherData(capital);
						
					    CovidInfo(cc);
						
					    TimeInfo(lat,lng);
						
                       
                        createGeoJson(countryGeoJson);
						
                        geoJsonLayer.bindTooltip(mapInfoDisplay()).toggleTooltip();
						
                      
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.warn(jqXHR.responseText)
                    console.log(errorThrown);
                    
                }
            });
        };

 function getWeatherData(capital){
    $.ajax({
        url: "libs/php/getWeatherInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
          
		   capitalCity:capital
		  
        },
        success: function(result){
            if(result.status.code == 200){
                //console.log(result);
	               
				//const{data} = result;
				//const{main,coord}= data;
	           
			   temp = result['data']['main']['temp'];
			   humidity = result['data']['main']['humidity'];
			   pressure = result ['data']['main'] ['pressure'];
			   temp_max = result ['data']['main']['temp_max'];
			   temp_min = result['data']['main']['temp_min'];
			   description = result['data']['weather'][0]['main'];
			  
			   wind =result['data']['wind']['speed'];
			   
			   
               //const lng = coord['lon'];
               //const lat = coord['lat'];
              //updateMarker(lat,lng);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`Error in weather: ${textStatus} : ${errorThrown} : ${jqXHR}`);
        }
    });
}

  
  
  
//get covid Info
	 function CovidInfo(cc){
  
	$.ajax({
        url: "libs/php/getCovidInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country:cc
		
        },
        success: function(result){
           // console.log(result);
            if(result.status.name == "ok"){
              
			 cases = result['data']['cases'];
			 active = result['data']['active'];
			 critical = result['data']['critical'];
			 deaths = result['data']['deaths'];
			 recovered = result['data']['recovered'];
			 todayCases = result['data']['todayCases'];
			 todayDeaths = result['data']['todayDeaths'];
			 todayRecoverd = result['data']['todayRecovered'];
			 tests = result['data']['tests'];
			  
		
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus} error in Covid Info`);
        }
   
    });
}

//get Time Info
	 function TimeInfo(lat,lng){
  
	$.ajax({
        url: "libs/php/getTime.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat:lat,
			lng:lng
		
        },
        success: function(result){
           // console.log(result);
            if(result.status.name == "ok"){
              
			   sunrise = result['data']['sunrise'];
			   sunset = result['data']['sunset'];
			   time = result['data']['time'];
			  
		
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus} error in Time Info`);
        }
   
    });
}

//Get Weather forcast
function setWeatherVars(resultJson) {
    if(resultJson['WeatherInfo'] == null || resultJson['WeatherInfo']['error']){
        
        //day1
        weatherDaye1 =  "N/A";
        day1Conditions = "N/A";
        day1Icon =  "N/A";
        day1Temp = "N/A";
        day1Wind = "N/A";
        day1Humidity = "N/A";
        day1Precip = "N/A";
    
        //day2
        weatherDay2 =  "N/A";
        day2Conditions = "N/A";
        day12Icon =  "N/A";
        day2Temp = "N/A";
        day2Wind = "N/A";
        day2Humidity = "N/A";
        day2Precip = "N/A";
    
        //day3
        weatherDate3 =  "N/A";
        date3Conditions = "N/A";
        date3Icon =  "N/A";
        date3Temp = "N/A";
        date3Wind = "N/A";
        date3Humidity = "N/A";
        date3Precip = "N/A";
        return;
    }

    
    
    //day1
    weatherDay1 =  resultJson['WeatherInfo']['forecast']['forecastday'][0]['date'];
    day1Conditions = resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['condition']['text'];
    day1Icon =  resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['condition']['icon'];
    day1Temp = resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['avgtemp_c'];
    day1Wind = resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['maxwind_mph'];
    day1Humidity = resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['avghumidity'];
    day1Precip = resultJson['WeatherInfo']['forecast']['forecastday'][0]['day']['totalprecip_mm'];

    //day2
    weatherDay2 =  resultJson['WeatherInfo']['forecast']['forecastday'][1]['date'];
    day2Conditions = resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['condition']['text'];
    day2Icon =  resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['condition']['icon'];
    day2Temp = resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['avgtemp_c'];
    day2Wind = resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['maxwind_mph'];
    day2Humidity = resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['avghumidity'];
    day2Precip = resultJson['WeatherInfo']['forecast']['forecastday'][1]['day']['totalprecip_mm'];

    //day3
    weatherDay3 =  resultJson['WeatherInfo']['forecast']['forecastday'][2]['date'];
    day3Conditions = resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['condition']['text'];
    day3Icon =  resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['condition']['icon'];
    day3Temp = resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['avgtemp_c'];
    day3Wind = resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['maxwind_mph'];
    day3Humidity = resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['avghumidity'];
    day3Precip = resultJson['WeatherInfo']['forecast']['forecastday'][2]['day']['totalprecip_mm'];    
	
	//moon
	moon_illumination =  resultJson['WeatherInfo']['forecast']['forecastday'][0]['astro']['moon_illumination'];
	moon_phase   =   resultJson['WeatherInfo']['forecast']['forecastday'][0]['astro']['moon_phase'];
	moonrise   = resultJson['WeatherInfo']['forecast']['forecastday'][0]['astro']['moonrise'];
	moonset    = resultJson['WeatherInfo']['forecast']['forecastday'][0]['astro']['moonset'];
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setLJSON(storageName,item) {
    localStorage.setItem(storageName, JSON.stringify(item));
}

function getLJSON(item) {
    return JSON.parse(localStorage.getItem(item));
}

function createGeoJson(geoJson) {
    if(geoJsonLayer){
        mymap.removeLayer(geoJsonLayer);
    }
    geoJsonLayer = L.geoJson(geoJson, {
        style: geoJsonStyle
    }).addTo(mymap);
    mymap.fitBounds(geoJsonLayer.getBounds());
}

function GeneralInfo() {
    return `
    <table id="info">
        <tbody>
            <tr>
                <td id="imageCell" colspan="2"><img class="flagImage" src="${countryFlagLink}"></td>
            </tr>

            <tr>
                <td id="tableTitle" colspan="2"><b>Country Information</b></td>
            </tr>


            <tr>
                <td class="key">Continent:</td>
                <td class="value">${region}</td>
            </tr>
            <tr>
                <td class="key">Capital:</td>
                <td class="value">${capital}</td>
            </tr>
            <tr>
                <td class="key">Population:</td>
                <td class="value">${numberWithCommas(population)}</td>
            </tr>

            <tr>
                <td class="key">Area:</td>
                <td class="value">${numberWithCommas(area)}km<sup>2</sup></td>
            </tr>

            <tr>
                <td class="key">Languages:</td>
                <td class="value">${languages}</td>
            </tr>

            <tr>
                <td class="key">Country Code:</td>
                <td class="value">${countryCode}</td>
            </tr>

            <tr>
                <td class="key" align="left" scope="row">Calling Codes:</td>
                <td class="value">${callingCodes}</td>
            </tr>
			<tr>
                <td class="key">Country Borders:</td>
                <td class="value">${borders}</td>
            </tr>

            <tr>
                <td colspan="2" class="linkCell"><a href="https://wikipedia.com/wiki/${countryName}" target="_blank">Wikipedia ${countryName}</a></td>
            </tr>
            

        </tbody>
    </table>
    `
}
function TimeZone() {
    return `
    <table id="info">
        <tbody>
 


            <tr>
                <td class="key">TimeZone:</td>
                <td class="value">${timezones}</td>
            </tr>
			<tr>
                <td class="key">Sunrise:</td>
                <td class="value">${sunrise}</td>
            </tr>
			 <tr>
                <td class="key">Sunset:</td>
                <td class="value">${sunset}</td>
            </tr>
			 <tr>
                <td class="key">Current Date and Time:</td>
                <td class="value">${time}</td>
            </tr>

         </tbody>

         
    </table>
    `
}

function Covid() {
    return `
    <table id="info">
        

            <tr>
                <td id="tableTitle" colspan="2"><b>Covid Information</b></td>
            </tr>


            <tr>
                <td class="key">Cases:</td>
                <td class="value">${cases}</td>
            </tr>
			<tr>
                <td class="key">Active:</td>
                <td class="value">${active}</td>
            </tr>
            <tr>
                <td class="key">Critical:</td>
                <td class="value">${critical}</td>
            </tr>
            <tr>
                <td class="key">Deaths:</td>
                <td class="value">${deaths}</td>
            </tr>

            <tr>
                <td class="key">Recovered:</td>
                <td class="value">${recovered}</td>
            </tr>

           
            <tr>
                <td class="key">Tests:</td>
                <td class="value">${tests}</td>
            </tr>

            <tr>
                <td class="key" >Today's Cases:</td>
                <td class="value">${todayCases}</td>
            </tr>
			<tr>
                <td class="key">Today's Deaths:</td>
                <td class="value">${todayDeaths}</td>
            </tr>
			<tr>
                <td class="key">Today's Recovered:</td>
                <td class="value">${todayRecoverd}</td>
            </tr>

           
            

        </tbody>
    </table>
    `
}


function Moon() {
    return `
    <table id="info">
        <tbody>
 


            <tr>
                <td class="key">Moon-Illumination:</td>
                <td class="value">${moon_illumination}</td>
            </tr>
			<tr>
                <td class="key">Moon-Phase:</td>
                <td class="value">${moon_phase}</td>
            </tr>
			 <tr>
                <td class="key">Moonrise:</td>
                <td class="value">${moonrise}</td>
            </tr>
			 <tr>
                <td class="key">Moonset:</td>
                <td class="value">${moonset}</td>
            </tr>

         </tbody>

         
    </table>
    `
}

function Weather() {
    return `
    <table id="info">
        <tbody>
           

            <tr>
                <td id="tableTitle" colspan="2"><b>Weather</b></td>
            </tr>

            
            <tr>
                <td class="key">Temprature in Kelvin:</td>
                <td class="value">${temp}</td>
            </tr>
            <tr>
                <td class="key">Humidity:</td>
                <td class="value">${humidity}</td>
            </tr>
            

            <tr>
                <td class="key">Pressure in Pascal:</td>
                <td class="value">${pressure}</td>
            </tr>
			 <tr>
                <td class="key">Maximum Temprature:</td>
                <td class="value">${temp_max}</td>
            </tr>
			 <tr>
                <td class="key">Minimum Temprature:</td>
                <td class="value">${temp_min}</td>
            </tr>
			<tr>
                <td class="key">Weather:</td>
                <td class="value">${description}</td>
            </tr>
           <tr>
                <td class="key">Wind Speed:</td>
                <td class="value">${wind}</td>
            </tr>
    


           

        </tbody>
    </table>
    `
}


function CurrencyInfo() {
    return `
    <table id="info">
        <tbody>
            

            <tr>
                <td id="tableTitle" colspan="2"><b>Currency Information</b></td>
            </tr>

            <tr>
                <td class="key">Currency Name:</td>
                <td class="value">${currencyName}</td>
            <tr>

            <tr>
                <td class="key">Currency Symbol:</td>
                <td class="value">${currencySymbol}</td>
            <tr>

            <tr>
                <td class="key">Currency Code:</td>
                <td class="value">${currency}</td>
            <tr>

            <tr>
                <td class="key">Current Exchange Rate:</td>
                <td class="value">${exchangeRate}</td>
            <tr>

            <tr>
                <td class="key">GDP (2019):</td>
                <td class="value">$${numberWithCommas(gdpInfo)}</td>
            <tr>

            <tr>
                <td class="key">GDP Growth:</td>
                <td class="value">${gdpGrowthInfo.toFixed(2)}%</td>
            <tr>
        </tbody>
    </table>

    <canvas id="myChart"></canvas>
    `
}

function WeatherInfo() {
    return `
    <table id="info">
        <tbody>
            
            <tr>
                <td colspan="4" class="weatherTitle"><b>Forecast for ${countryName}</b></td>
            </tr>

            <tr>
                <td class="forecastIconCell"><img class="foreCastIcon" src=${day1Icon}></td>
                <td class="forecastCell">${weatherDay1}</td>
                <td class="forecastCell">${day1Temp}<span>&#176</span>C</td>
             
            </tr>

                <tr id="date1Forecast">
                    <td colspan="4">    
                        
                        
                                    <tr>
                                        <td class="key" colspan="2">Outside:</td>
                                        <td class="value" colspan="2">${day1Conditions}</td>
                                    </tr>

                                    <tr>
                                        <td class="key " colspan="2">Temprature:</i></td>
                                        <td class="value" colspan="2">${day1Temp}<span>&#176</span>C</td>
                                    </tr>
                        
                                    <tr>
                                        <td class="key " colspan="2">Wind Speed:</td>
                                        <td class="value" colspan="2">${day1Wind} mph</td>
                                    </tr>
                                    
                                    <tr>
                                        <td class="key " colspan="2">Rain:</td>
                                        <td class="value" colspan="2">${day1Precip}mm</td>
                                    </tr>

                                    <tr>
                                        <td class="key" colspan="2"> Humidity:</td>
                                        <td class="value" colspan="2">${day1Humidity}%</td>
                                    </tr>
                          
                       
                    </td>
                </tr>


            <tr>
                <td class="forecastIconCell"><img class="foreCastIcon" src=${day2Icon}></td>
                <td class="forecastCell">${weatherDay2}</td>
                <td class="forecastCell">${day2Temp}<span>&#176</span>C</td>
               
            </tr>


                <tr id="date2Forecast">
                    <td colspan="4">
                  
                        
                            <tr>
                                <td class="key" colspan="2">Outside:</td>
                                <td class="value" colspan="2">${day2Conditions}</td>
                            </tr>

                            <tr>
                                <td class="key " colspan="2">Temprature:</td>
                                <td class="value" colspan="2">${day2Temp}<span>&#176</span>C</td>
                            </tr>
                
                            <tr>
                                <td class="key " colspan="2">Wind Speed:</td>
                                <td class="value" colspan="2">${day2Wind} mph</td>
                            </tr>
                            
                            <tr>
                                <td class="key " colspan="2">Rain:</td>
                                <td class="value" colspan="2">${day2Precip}mm</td>
                            </tr>

                            <tr>
                                <td class="key" colspan="2"> Humidity:</td>
                                <td class="value" colspan="2">${day2Humidity}%</td>
                            </tr>
                       
                    
                    </td>
                </tr>

            <tr>
                <td class="forecastIconCell"><img class="foreCastIcon" src=${day3Icon}></td>
                <td class="forecastCell">${weatherDay3}</td>
                <td class="forecastCell">${day3Temp}<span>&#176</span>C</td>
               
            </tr>
                <tr id="date3Forecast">
                    <td colspan="4">
                    
                        
                            <tr>
                                <td class="key" colspan="2">Outside:</td>
                                <td class="value" colspan="2">${day3Conditions}</td>
                            </tr>

                            <tr>
                                <td class="key " colspan="2">Temprature:</td>
                                <td class="value" colspan="2">${day3Temp}<span>&#176</span>C</td>
                            </tr>
                
                            <tr>
                                <td class="key " colspan="2">Wind Speed:</td>
                                <td class="value" colspan="2">${day3Wind} mph</td>
                            </tr>
                            
                            <tr>
                                <td class="key " colspan="2">Rain:</td>
                                <td class="value" colspan="2">${day3Precip}mm</td>
                            </tr>

                            <tr>
                                <td class="key" colspan="2">Humidity:</td>
                                <td class="value" colspan="2">${day3Humidity}%</td>
                            </tr>
                       
                    </td>
                </tr>
        </tbody>
    </table>
    `
}

function mapInfoDisplay(){
    return `
    <table id="mapInfo">
        <tbody>
            <tr>
                <td id="imageCell"><img class="flagImage" src="${countryFlagLink}"></td>
                <td class="titleCell"><b>${countryName}</b></td>
            </tr>

            <tr>
                <td class="key">Capital City:</td>
                <td class="value">${capital}</td>
            </tr>

            <tr>
                <td class="key">Continent:</td>
                <td class="value">${region}</td>
            </tr>

            <tr>
                <td class="key">Population:</td>
                <td class="value">${numberWithCommas(population)}</td>
            </tr>

            <tr>
                <td class="key">Currency:</td>
                <td class="value">${currencyName}</td>
            </tr>
        </tbody>
    </table>
`
}


function ShowGeneralInfo(){
    $('.modal-title').html(`</b>${countryName}</b>`);
    $('.modal-body').html(GeneralInfo());
    mymap.closeTooltip();
    $('.modal').show();
}

function ShowCurrencyInfo(){
    $('.modal-title').html(`</b>${countryName} - Currency& USD Exchange rate</b>`);
    $('.modal-body').html(CurrencyInfo());
    mymap.closeTooltip();
    $('.modal').show()
}
function ShowTimeZone(){
    $('.modal-title').html(`</b>${countryName} - Time Zone</b>`);
    $('.modal-body').html(TimeZone());
    mymap.closeTooltip();
    $('.modal').show()
}
function ShowMoon(){
    $('.modal-title').html(`</b>${countryName} - About Moon</b>`);
    $('.modal-body').html(Moon());
    mymap.closeTooltip();
    $('.modal').show()
}
function ShowWeather(){
    $('.modal-title').html(`</b>${countryName} - Weather</b>`);
    $('.modal-body').html(Weather());
    mymap.closeTooltip();
    $('.modal').show()
	
}
function ShowCovid(){
    $('.modal-title').html(`</b>${countryName} - Covid19( Carona Virus)<i class="material-icons icon">coronavirus</i></b>`);
    $('.modal-body').html(Covid());
    mymap.closeTooltip();
    $('.modal').show()
	
}

function ShowWeatherInfo() {
    $('.modal-title').html(`</b>${countryName} - Weather Forecast</b>`);
    $('.modal-body').html(WeatherInfo());
    mymap.closeTooltip();
    $('.modal').show()

}
//Event Listeners
    $('#countryInput').on('change', () => {
        setCountryInformation();
    });
    
    $('.close').on('click', () => {
        $('.modal').hide();
    });
    
    $('.btn').on('click', () => {
       $('.modal').hide();
    });
           
  
	$(document).ready(() => {
    main();
});


