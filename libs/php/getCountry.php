<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $output = [];
    $countryCode = '';
    $countryIsoAlpha3 = '';
    $userCurrency = $_REQUEST['currency'];

    
    if(isset($_REQUEST['lat']) && isset($_REQUEST['lng'])){
        $countryCodeUrl = 'api.geonames.org/countryCodeJSON?lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=vinum';

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $countryCodeUrl);

        $countryCodeResponse = curl_exec($ch);
        curl_close($ch);

        $countryCodeResult = json_decode($countryCodeResponse, true);

        $countryCode = $countryCodeResult['countryCode'];

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "Country Code acquired";
    $output['CountryCode'] = $countryCodeResult;
    } else {
        $countryCode = $_REQUEST['countryCode'];
    }

   
    $restCountriesUrl = 'https://restcountries.eu/rest/v2/alpha/' . $countryCode;

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $restCountriesUrl);

        $restCountriesResult = curl_exec($ch);

        curl_close($ch);

    $restCountriesDecode =  json_decode($restCountriesResult, true);
    $countryIsoAlpha2 = $restCountriesDecode['alpha2Code'];

    $output['RestCountries'] = $restCountriesDecode;
    
   
    $countryInfoUrl = 'http://api.geonames.org/countryInfoJSON?country=' . $countryIsoAlpha2 . '&username=vinum';

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $countryInfoUrl);

        $countryInfoResult = curl_exec($ch);

        curl_close($ch);

    $countryInfoDecode = json_decode($countryInfoResult, true);
    $countryIsoAlpha3 = $countryInfoDecode['geonames'][0]['isoAlpha3'];

    $output['CountryInfo'] = $countryInfoDecode;




    
    $currencyInfoURL = '';
    if($userCurrency != $countryInfoDecode['geonames'][0]['currencyCode']){
        $currencyInfoURL = 'https://api.exchangerate.host/convert?from=' . $userCurrency . '&to=' . $countryInfoDecode['geonames'][0]['currencyCode'];
    } else {
        $currencyInfoURL = 'https://api.exchangerate.host/convert?from=' . $userCurrency . '&symbols=GBP,USD,EUR';
    }

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $currencyInfoURL);

        $currencyInfoResult = curl_exec($ch);

        curl_close($ch);

        $currencyInfoDecode = json_decode($currencyInfoResult);

        $output['CurrencyInfo'] = $currencyInfoDecode;
 

	


    
        $weatherUrl = 'http://api.weatherapi.com/v1/forecast.json?key=c42c3a95c1b648918b0130643200212&q=' . $restCountriesDecode['capital'] . '&days=7';
  
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $weatherUrl);

        $weatherForecastResult = curl_exec($ch);

        curl_close($ch);

        $weatherForecastDecode = json_decode($weatherForecastResult);

        $output['WeatherInfo'] = $weatherForecastDecode;

  

    
    $geoJsonString = file_get_contents("../geoJson/countries_small.geo.json");

    $geoJsonDecode = json_decode($geoJsonString,true);
    $geoJsonCountries = $geoJsonDecode['features'];
    $countryGeoJson = '';

    foreach($geoJsonCountries as $country){
        if($country['id'] == $countryIsoAlpha3){
            $countryGeoJson = $country['geometry'];
        break;
        }
    }

    $output['geoJson'] = $countryGeoJson;


   $indicatorUrl = 'http://api.worldbank.org/v2/country/' . $countryIsoAlpha2 . '/indicators/NY.GDP.MKTP.CD?date=2019&format=json';

    $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $indicatorUrl);

    $indicatorResult = curl_exec($ch);

    curl_close($ch);
    
    $indicatorDecode = json_decode($indicatorResult,true);

    $output['Indicator'] = $indicatorDecode;

    $indicatorGrowthUrl = 'http://api.worldbank.org/v2/country/' . $countryIsoAlpha2 . '/indicators/NY.GDP.MKTP.KD.ZG?date=2019&format=json';

    $ch = curl_init();

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $indicatorGrowthUrl);

    $indicatorGrowthResult = curl_exec($ch);

    curl_close($ch);
    
    $indicatorGrowthDecode = json_decode($indicatorGrowthResult,true);

    $output['IndicatorGrowth'] = $indicatorGrowthDecode;

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "Information acquired";

    header('Content-Type:application/json; charset=UTF-8');
    
    echo json_encode($output);
	
?>