// Seleccionar todos los botones con la clase "residuo-btn"
import { mostrarMarcadores } from './map-markers.js';
var buttons = document.querySelectorAll(".residuo-btn");
let direcciones;
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    //console.log("El botón fue clickeado");
    var tipo_residuo = this.id;
    //console.log("El tipo de residuo es: ", tipo_residuo);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        direcciones = this.responseText;
        mostrarMarcadores(direcciones);
      }
    };
    xhr.open("GET", "http://localhost:3000/residuo/" + tipo_residuo, true);
    xhr.send();
    
  });
});
