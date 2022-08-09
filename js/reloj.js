var nivelJuego = 0;


//Basicamente se obtiene el nombre del div donde se va imprimir el segundo, como un reloj
var segundoTranscurrido = 0;
var divReloj = document.getElementById("reloj");
var iniciarReloj = window.setInterval(function(){
  
  if (segundoTranscurrido==20) {
    nivelJuego=1;
  }else if (segundoTranscurrido==37) {
    nivelJuego=2;
  }else if (segundoTranscurrido==55) {
    nivelJuego=3;
  }else if (segundoTranscurrido==75) {
    nivelJuego=4;
  }else if (segundoTranscurrido==85) {
    nivelJuego=4;
  }

  divReloj.innerHTML = "<h4>Tiempo Transcurido: " + segundoTranscurrido + " segundos </h4>" + "<h5 style='color:red'>Nivel: " + nivelJuego + "</h5> ";
  segundoTranscurrido++;
},1000);


