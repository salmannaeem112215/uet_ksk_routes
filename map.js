mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbWFuMTEyMjE1IiwiYSI6ImNsNWtvNHJ3ZjBjMXEzY21waXkyaWx0cXcifQ.wlb1Y-25-WYT9ecU9EOmRQ';



  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom:11,
    center:[74.35516,31.57894]
    });
     
    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');
     
    for (const input of inputs) {
    input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  
    };
    }

  // Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );

map.on('click', 'circle', (e) => {
    map.flyTo({
    center: e.features[0].geometry.coordinates
    });
    });



    