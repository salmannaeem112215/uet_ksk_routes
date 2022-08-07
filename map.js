mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbWFuMTEyMjE1IiwiYSI6ImNsNWtvNHJ3ZjBjMXEzY21waXkyaWx0cXcifQ.wlb1Y-25-WYT9ecU9EOmRQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom:11,
    center:[74.35516,31.57894]
  });


  // Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
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

