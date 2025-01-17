import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./daynight.css";
import "leaflet-side-by-side";
import L from "leaflet";

let mapSlider = L.map("map-slider").setView([45.25, 12], 5);
let daylayerSlider = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 8,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }
).addTo(mapSlider);
let nightlayerSlider = L.tileLayer(
  "http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
  {
    attribution:
      '&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://earthobservatory.nasa.gov/features/NightLights" target="_blank">NASA Earth Observatory</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>',
    maxZoom: 8,
    format: "jpg",
    time: "",
    tilematrixset: "GoogleMapsCompatible_Level"
  }
).addTo(mapSlider);

setTimeout(function () {
  mapSlider.invalidateSize();
}, 700);

let mapPointer = L.map("map-pointer").setView([45.25, 12], 5);
let daylayerPointer = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 8,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }
).addTo(mapPointer);
let nightlayerPointer = L.tileLayer(
  "http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
  {
    attribution:
      '&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://earthobservatory.nasa.gov/features/NightLights" target="_blank">NASA Earth Observatory</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>',
    maxZoom: 8,
    format: "jpg",
    time: "",
    tilematrixset: "GoogleMapsCompatible_Level"
  }
).addTo(mapPointer);

setTimeout(function () {
  mapPointer.invalidateSize();
}, 700);

var centered = { lat: 45.24395342262324, lng: 11.97509765625 };
var zoomed = 5;
var mapSliderContainer = document.getElementById("map-slider");
var mapPointerContainer = document.getElementById("map-pointer");
var switchBtn = document.querySelector("#switch");
var sliderBtn = true;
var slider = L.control
  .sideBySide(nightlayerSlider, daylayerSlider)
  .addTo(mapSlider);
var nightvision = document.querySelectorAll("#map-pointer .leaflet-layer")[1];
mapPointer.on("mousemove", function (e) {
  var m = e.layerPoint;
  var r = mapPointer.getZoom();
  nightvision.style["clip-path"] =
    "circle(" + 20 * r + "px at " + m.x + "px " + m.y + "px)";
});

mapPointerContainer.style.display = "none";
mapSliderContainer.style.display = "block";

function switcher() {
  if (!sliderBtn) {
    mapSlider.setView([centered.lat, centered.lng], zoomed);
    setTimeout(function () {
      mapSlider.invalidateSize();
    }, 700);
    switchBtn.firstChild.innerHTML = "Pointer";
    mapPointerContainer.style.display = "none";
    mapSliderContainer.style.display = "block";
    sliderBtn = true;
    centered = mapSlider.getCenter();
    zoomed = mapSlider.getZoom();
  } else if (sliderBtn) {
    mapPointer.setView([centered.lat, centered.lng], zoomed);
    setTimeout(function () {
      mapPointer.invalidateSize();
    }, 700);
    switchBtn.firstChild.innerHTML = "Slider";
    mapSliderContainer.style.display = "none";
    mapPointerContainer.style.display = "block";
    mapPointerContainer.style.cursor = "none";
    sliderBtn = false;
    centered = mapPointer.getCenter();
    zoomed = mapPointer.getZoom();
  }
}

switchBtn.addEventListener("click", switcher);

/* var NileBtn = document.querySelector("#NiledeltaButton");
NileBtn.addEventListener("click", function () {
  mapSlider.setView([30.69465405579703, 31.17247680608247], 6);
});

var KoreaBtn = document.querySelector("#KoreaborderButton");
KoreaBtn.addEventListener("click", function () {
  mapSlider.setView([38.13822211777068, 126.95275691055014], 6);
});

var AustraliaBtn = document.querySelector("#AustraliaButton");
AustraliaBtn.addEventListener("click", function () {
  mapSlider.setView([-25.82159516963374, 134.94264114831412], 4);
});

var MoscowBtn = document.querySelector("#MoscowButton");
MoscowBtn.addEventListener("click", function () {
  mapSlider.setView([55.75599583184038, 37.60800775318242], 8);
}); */
