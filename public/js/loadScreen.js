window.addEventListener("load", function () {
  setTimeout(function () {
    //ocultar la pantalla de carga
    const loader = document.querySelector(".loader-wrapper");
    loader.className += " hidden";

    const active = document.querySelector(".active");
    active.classList.remove("hidden");
    
    document.getElementById('foota').style.display = "block";

    document.getElementById('cabezote').style.display = "block";
  }, 3000);

});