let myMap;
let originPosition;

function init() {
  renderMap();
  getLocation();
  setEventListeners();
}

function setEventListeners() {
  document.querySelector("#calculateRoute").onclick = () => {
    const { value } = document.querySelector("#destinationInput");
    renderRoute(value);
  };
}

function renderRoute(destination) {
  const routeDetails = {
    destination: destination,
    origin: originPosition,
    travelMode: "DRIVING",
  };

  const service = new google.maps.DirectionsService();

  service.route(routeDetails, (routeResult) => drawRoute(routeResult));
}

function drawRoute(routeData) {
  const renderer = new google.maps.DirectionsRenderer();
  renderer.setDirections(routeData);
  renderer.setMap(myMap);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => updateMapPosition(position),
    (error) => console.log("THIS IS AN ERROR", err)
  );
}

function updateMapPosition(position) {
  const { coords } = position;
  const currentPosition = { lat: coords.latitude, lng: coords.longitude };
  originPosition = currentPosition;
  myMap.setCenter(currentPosition);
  new google.maps.Marker({
    map: myMap,
    position: currentPosition,
  });
}

function renderMap() {
  myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 15,
    center: {
      lat: 57.8650895230837,
      lng: 11.914371511068959,
    },
    mapId: "ccb72d7b72697af",
  });
}
