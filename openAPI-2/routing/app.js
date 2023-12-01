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
    (position) => {
      updateMapPosition(position);
      placeSearch({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => console.log("THIS IS AN ERROR", error)
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
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  });
}

function renderMap() {
  myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 15,
    center: {
      lat: 57.86,
      lng: 11.91,
    },
    mapId: "fb0a21bf1dd5baf4",
  });
}

async function placeSearch(currentPosition) {
  try {
    const formattedCoordinates = `${currentPosition.lat},${currentPosition.lng}`;
    const searchParams = new URLSearchParams({
      query: "coffee",
      ll: formattedCoordinates,
      open_now: "true",
      sort: "DISTANCE",
      v: "20231120",
    });
    const results = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "#=",
        },
      }
    );
    const data = await results.json();
    data.results.forEach((result) => {
      console.log(result);

      if (
        result.categories.some(
          (category) =>
            category.name === "Coffee Shop" || category.name === "Café"
        )
      ) {
        var infoWindow = new google.maps.InfoWindow({
          content:
            "Name: " +
            result.name +
            "<br>Address: " +
            result.location.address +
            "<br>Open: " +
            result.closed_bucket +
            "<br>Distance: " +
            result.distance +
            "M",
        });
        if (result.location) {
          new google.maps.Marker({
            map: myMap,
            position: {
              lat: result.geocodes.main.latitude,
              lng: result.geocodes.main.longitude,
            },
            title: result.name,
          }).addListener("click", function () {
            infoWindow.open(myMap, this);
          });
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
}
placeSearch();
