var mymap = L.map('map').setView([46.947373, -122.467691], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoidGJyYWRlIiwiYSI6ImNsMmM1eWxrdTBseGczZHBob21mcWk2ODgifQ.2-MCOorMSHwgnu5yYg5dCA',
}).addTo(mymap);        //Above lines from a previous Lab 1 in TGIS 504



function getColor(features) {              //getColor and getStyle functions copied from https://leafletjs.com/examples/choropleth/
    return   features > 9  ? '#00802b' :
             features > 8  ? '#00ff55' :
             features > 7  ? '#99ffbb' :
             features > 6  ? '#ffff80' :
             features > 5  ? '#ffff00' :
             features > 4  ? '#ff9900' :
             features > 3  ? '#cc7a00' :
             features > 2  ? '#ff704d' :
                        '#801a00';
};


function getStyle(features) {
    return {
        fillColor: getColor(features.properties.gridcode),
        weight: 2,
        opacity: 0.4,
        color: 'grey',
        // dashArray: '3',
        fillOpacity: 0.7
    };
}

$.getJSON("Data/Access_to_Fresh_Food_Index_GCS_WGS.geojson",function(data){        // The three lines below were adapted from code from this website: https://geekswithlatitude.readme.io/docs/leaflet-map-with-geojson-popups
    L.geoJson(data, {style: getStyle,
      onEachFeature: function(feature, layer) {
       layer.bindPopup("Index Score:" + "<br>" + feature.properties.gridcode);
    }}).addTo(mymap)
});
