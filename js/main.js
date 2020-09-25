function map(lat, lng) {
  document.getElementById("map-container").innerHTML = "<div id='map'></div>";
  var map = L.map("map").setView([lat, lng], 11);
  L.tileLayer(
    "https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=Foknk8EioBc03eGnnxsf",
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      maxZoom: 40,
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
  L.marker([lat, lng]).addTo(map);
}
function fetchData(ip) {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_fM1tRbTJWXClQKngo1Nqy2EynvgiJ&ipAddress=${ip}`
  )
    .then((data) => data.json())
    .then((data) => {
      let lat = data.location.lat;
      let lng = data.location.lng;
      document.getElementById("ip-address").textContent = ip;
      document.getElementById("location").textContent =
        data.location.city + "," + data.location.region;
      document.getElementById("timezone").textContent =
        "UTC" + " " + data.location.timezone;
      document.getElementById("isp").textContent = data.isp;
      map(lat, lng);
    });
}

fetch(`https://api.ipify.org`)
  .then((data) => data.text())
  .then((data) => {
    fetchData(data);
  });

document.getElementById("fetch_btn").addEventListener("click", function () {
  let ip = document.getElementById("search").value;
  fetchData(ip);
  document.getElementById("search").value = null;
});
