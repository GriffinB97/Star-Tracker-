let locationHistory = [];

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const myLatlng = { lat: 35.2164, lng: -80.954 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: myLatlng,
    });
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });

    console.log(myLatlng);
  
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
      );
      infoWindow.open(map);

      let newClickLat = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
      console.log(newClickLat);
      // console.log(Object.values(clickHistory[0]));

      let locationData = newClickLat.match(/-?\d+/g);
      let latitudeData = locationData[0]+'.'+locationData[1];
      let longitudeData = locationData[2]+'.'+locationData[3];

      let clickLocation = {
        lat: latitudeData,
        lng: longitudeData,
      }
      locationHistory.push(clickLocation);
    });
  }
  
  initMap();