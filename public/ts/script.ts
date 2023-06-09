/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
console.log("The TypeScript file is being activated by the EJS file.");
var image = './images/location.png';

let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

function initMap(): void {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: pos,
      zoom: 15,
      disableDefaultUI: true,
    });
  
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: "Your Current Location"
    });

    let currentLocationButton = document.getElementById("current-location-button") as HTMLButtonElement;
  currentLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        if (marker) {
          marker.setMap(null);
        }
        marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: image,
        });
      });
    }
  });
  infoWindow = new google.maps.InfoWindow();
  
  const locationButton = document.createElement("button");
  
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
      () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  });
}

)}function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
const watchId = navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
  });
window.initMap = initMap;
export {};




