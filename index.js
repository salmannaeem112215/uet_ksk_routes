var allMarkers = [];
var allPopups = [];
const _map_info = document.querySelector(".map-info");
const _myCordinates = document.querySelector(".myLocation");



// Event Listners
$("#viewMarkers").change(function () {
  if ($(this).val() == -1) {
    getMyLocation();
  }
  if ($(this).val() == 1) {
    displayUetMain()
  }
  if ($(this).val() == 2) {
    displayUetKSK()
  }
  
});
// Event Listners
$("#viewLocationsMain").change(function () {
  if ($(this).val() == -1) {
    getMyLocation();
  }
  if ($(this).val() == 1) {
    displayUetMain()
  }
  if ($(this).val() == 2) {
    displayUetKSK()
  }
  
});

// Event Listners and building Routes , markers and Path
$("#viewRoutes").change(function () {
  //Removing Marker
  cleanInfoBox();
  removeMarkers();
  removePopups();
  //Verifying and creatingr markers
  let _value = $(this).val();
  if (_value >= 1 || _value <= 8) {
    
    console.log(_value);
    buildRoute(_value);
    console.log(`you pressed ${$(this).val()}`);
  }
  else {
    alert("You Have Selected none")
  }
});








// THIS WILL Remove all the messages
const cleanInfoBox = ()=>{
  _map_info.innerHTML=""; 
}
// THIS WILL ADD MESSAAGE IN THE DOM CONTIANER
const appened = (message)=>{
  const _message=`
  <h3 class="item_name">
  Location : ${message.name}
  </h3>
  <h3 class="item_time">
  Time     : ${message.time}
  </h3>
  `;
  const messageElement=document.createElement('div') // <div></div>
  messageElement.classList.add('info_items');
  messageElement.innerHTML=_message
  _map_info.append(messageElement); 
}
// THIS WILL ADD MESSAAGE IN THE DOM CONTIANER
const _myLocation = ()=>{
  const _message=`hi`;
  // const messageElement=document.createElement('div') // <div></div>
  // messageElement.classList.add('info_items');
  // messageElement.innerHTML=_message
  _myCordinates.innerHTML("hi"); 
}
//This will get Current Location
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMyPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  let __latitude = position.coords.latitude;
  let __longitude = position.coords.longitude;
  return {
    __latitude,
    __longitude
  }
}



//This will Show Your Current Location
function showMyPosition(position) {
  console.log(position.coords.latitude + "  " + position.coords.longitude);
  center[position.coords.longitude,position.coords.latitude];
  let long=position.coords.longitude;
  let lat=position.coords.latitude;
  _addMyPoint([long,lat]);
  map.jumpTo({
    center:[position.coords.longitude,position.coords.latitude],
    zoom: 14,
  });
}

function displayUetMain() {
  map.jumpTo({
    center: [74.35586768587441,31.578964675606525],
    zoom: 14,
  });
}
function displayUetKSK() {
  map.jumpTo({
    center: [74.24728529287846, 31.69425080683311],
    zoom: 14,
  });
}



function buildRoute(_value) {
  console.log(`.\\uet_routes\\route${_value}.json`);
  fetch(`.\\uet_routes\\route${_value}.json`)
    .then(response => response.json())
    .then(rsp => {
      _addStart(rsp.path);
      _addEnd(rsp.path);
      _addPath(rsp.path);
      _addMarkers(rsp);
      
    })
}

function removeMarkers() {
  if (allMarkers !== null) {
    for (var i = allMarkers.length - 1; i >= 0; i--) {
      allMarkers[i].remove();
      delete allMarkers[i];
      allMarkers.pop();
      console.log("Markers-Removed");
    }
  }
}
function removePopups() {
  if (allPopups !== null) {
    for (var i = allPopups.length - 1; i >= 0; i--) {
      allPopups[i].remove();
      delete allPopups[i];
      allPopups.pop();
      console.log("Pop-Removed");
    }
  }
}



function _addMyPoint(cord){
  const myPoint = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [cord[0],cord[1]]
        }
      }
    ]
  };

  if (map.getLayer('myPoint')) {
    map.getSource('myPoint').setData(myPoint);
  } else {
    map.addLayer({
      id: 'myPoint',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [cord[0],cord[1]]
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
  }


}
function _addStart(_path){
  const startLon=_path[0][0];
  const startLat=_path[0][1];
  const startCircle = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [startLon,startLat]
        }
      }
    ]
  };

  if (map.getLayer('startCircle')) {
    map.getSource('startCircle').setData(startCircle);
  } else {
    map.addLayer({
      id: 'startCircle',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [startLon,startLat]
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
  }


}
function _addEnd(_path){
  const endLon=_path[_path.length-1][0];
  const endLat=_path[_path.length-1][1];
  //For End Circles
  const endCircle = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [endLon,endLat]
        }
      }
    ]
  };
  if (map.getLayer('endCircle')) {
    map.getSource('endCircle').setData(endCircle);
  } else {
    map.addLayer({
      id: 'endCircle',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [endLon,endLat]
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }

}

function _addPath(_path) {
  const route =
  {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': _path
    }
  }

  if (map.getSource("route")){
    map.getSource('route').setData(route)
  }
  else{
    map.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': _path

        }
      }
    });
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });
  }
}

function _addMarkers(rsp){
  count = 0;
  rsp.route.forEach(element => {
      count++;
      latitude = element.latitude
      longitude = element.longitude;
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(`${count} : ${element.name}`);
      // create DOM element for the marker
      const el = document.createElement('div');
      el.id = 'marker';

      var oneMarker = new mapboxgl.Marker({ draggable: false, color: `rgb(255,0,0)` }).setLngLat([longitude, latitude]).setPopup(popup).addTo(map);
      // oneMarker.setData()
      appened({"name":`${element.name}`,"time":"NILL"})
      allPopups.push(popup); // will add popup message in list 
      allMarkers.push(oneMarker); // will add popup message in list 
    });
}