<?
$string = file_get_contents("geojson/countries.geo.json");

$var = $_REQUEST['iso3'];
$array = json_decode($string, true);
for($index = 0 ; $index < 255 ; $index++){
if($array["features"][$index]["properties"]["ISO_A3"] == $var){
$output = $array["features"][$index];
break;
}
}
echo json_encode($output);
?>