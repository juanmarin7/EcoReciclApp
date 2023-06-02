
  export function mostrarMarcadores(direcciones){

    //window.location.href = '/map-markers?data=' + direcciones;
    var geocoder = new google.maps.Geocoder();

    var url = window.location.pathname;
    //abrirMapa(direcciones);
    //console.log(direcciones);

    var datosUrl = 'Plastico';

    axios.get('http://localhost:3000/residuo/' + datosUrl)
      .then(function (response) {

        //datos del back
        const datos = response.data;

        //console.log(datos[0],datos[1]);

        datos.map(function (element) {
          //console.log(element);

          geocoder.geocode({ 'address': element }, function (results, status) {

            var locations = [];

            console.log(results[0].geometry.viewport);

            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              // console.log(latitude);
              // console.log(longitude);

              // locations.push(latitude);
              // locations.push(longitude);

              //var urlData = `https://www.google.com/maps/@${latitude},${longitude},15z`;
              //console.log(urlData);

              //console.log(locations);

              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: new google.maps.LatLng(6.2510629, -75.567883),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              });

              var infowindow = new google.maps.InfoWindow();

              var marker, i;

              //console.log(locations);

              //for (i = 0; i < locations.length; i++) {

                //console.log(locations[i]);

                  // marker = new google.maps.Marker({
                  //   position: new google.maps.LatLng(locations[i][i], locations[i][i]),
                  //   map: map
                  // });

                // google.maps.event.addListener(marker, 'click', (function (, i) {
                //   return function () {
                //     infowindow.setContent(locations[i][i]);
                //     infowindow.open(map, marker);
                //   }
                // })(marker, i));
              //}

            }
          }); 

        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


  }

function abrirMapa(x) {

        // Código para agregar los marcadores al mapa
        var locations = [
          ['Bondi Beach', -33.890542, 151.274856],
          ['Coogee Beach', -33.923036, 151.259052,],
          ['Cronulla Beach', -34.028249, 151.157507],
          ['Manly Beach', -33.80010128657071, 151.28747820854187],
          ['Maroubra Beach', -33.950198, 151.259302, 1]
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(-33.92, 151.25),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
  }


