//Basicamente se obtiene el nombre del div donde se va imprimir el segundo, como un reloj
var segundoTranscurrido = 0;
var divReloj = document.getElementById("reloj");
var iniciarReloj = window.setInterval(function(){
  divReloj.innerHTML = segundoTranscurrido;
  segundoTranscurrido++;
},1000);


