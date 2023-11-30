let myMap;

function init() {
  renderMap();
  getLocation();
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => updateMapPosition(position),
    (error) => console.log("THIS IS AN ERROR", err)
  );
}

function updateMapPosition(position) {
  const { coords } = position;
  const CurrentPosition = { lat: coords.latitude, lng: coords.longitude };
  myMap.setCenter(CurrentPosition);
  new google.maps.Marker({
    map: myMap,
    position: CurrentPosition,
  });
}

function renderMap() {
  myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 15,
    center: {
      lat: 57.8650895230837,
      lng: 11.914371511068959,
    },
    mapId: "d690428b1878abcd",
  });
}
