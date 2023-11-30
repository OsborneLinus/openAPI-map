function init() {
  const myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 15,
    center: {
      lat: 57.8650895230837,
      lng: 11.914371511068959,
    },
    mapId: "d690428b1878abcd",
  });

  new google.maps.Marker({
    map: myMap,
    position: {
      lat: 57.8650895230837,
      lng: 11.914371511068959,
    },
  });
}
