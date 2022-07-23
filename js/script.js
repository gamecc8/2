// contiene la musica que se utiliza en el juego
const musicaMovimiento = new Audio('music/laserShoot.wav');
const musicaGameOver = new Audio('music/explosion.wav');
const musicaInicioJuego = new Audio('music/random.wav');


// Posibles imagenes para imprimir en game over
var arregloIconoGameOver = ["gameover1.png", "gameover2.png"];
var tamanoImagenGameOver = 256;

// Random del color del player del jugador, tomando en cuenta que son varios jugadores
//var arregloColorJugador =  ["red", "blue","pink","crimson","green","#DED822","#5BDE22","#22BCDE","#A7B2B5","#C381FD","#FD81DF"]; 
var arregloColorJugador =  ["url(img/soccer.png)","url(img/tennis.png)","url(img/basketball.png)","url(img/volleyball.png)","url(img/beach-ball.png)","url(img/tierra.png)","url(img/venus.png)","url(img/marte.png)","url(img/urano.png)"];

var longitudArregloColorJugador = arregloColorJugador.length;

/****
 * Se utiliza para generar un random de la posicion del juego del player
 * El rango de valores va de un minimo, el minimo puede ser 0. Se utiliza 
 * 0 cuando estamos utilizando los arreglos de las posibles imagenes del player 
 * LongitudArreglo: representa la longitud maxima del arreglo donde estan contenidas las imagenes
 * de game over o imagenes del jugador
 * 
 * Cuando se utiliza para generar la posicion del jugador, va de 2 a 373
 */
function generarPosicionArreglo(longitudArreglo,numeroMinimo) {
    var number = Math.floor(Math.random() * longitudArreglo + numeroMinimo);
    return number;
}

//se utiliza para asignarle un nuevo color a las escaleras, despues de cierto tiempo
function updateEscaleras(contador,color){
    document.getElementById("block"+contador).style.backgroundColor = color;
}

function actualizarEscenarioJuego(segundosJugando,contador){
    //cada cierto segundo actualizamos el color del escenario
    if(segundosJugando==10){
        updateEscaleras(contador,"orange");
    }else if(segundosJugando==20){
        updateEscaleras(contador,"#717171");
    }else if(segundosJugando==30){
        updateEscaleras(contador,"#380A2D");
    }else if(segundosJugando==45){
        updateEscaleras(contador,"#971F7A");
    }else if(segundosJugando==52){
        updateEscaleras(contador,"#FF8972");
    }else if(segundosJugando==66){
        updateEscaleras(contador,"#0400FF");
    }else if(segundosJugando==78){
        updateEscaleras(contador,"#FF68E4");
    }else{
        updateEscaleras(contador,"black");
    }
}

var randomColor = generarPosicionArreglo(longitudArregloColorJugador,0);
var jugador = arregloColorJugador[randomColor];

/**
 * A partir se generara un rango de posicion donde el jugador puede aparece al iniciar el juego 
    numeroMinimoPosicionJugador: representa la posicion mas a la izquierda donde el jugador puede estar
 *  
 *  numeroMaximoPosicionJugador: representa la posicion mas a la DERECHA donde el jugador puede aparecer al iniciar el juego
*/ 
var numeroMinimoPosicionJugador = 2;
var numeroMaximoPosicionJugador = 373;
var generarPosicionInicialJugador = generarPosicionArreglo(numeroMaximoPosicionJugador,numeroMinimoPosicionJugador);


var character = document.getElementById("character");


//se posiciona el jugador a su posicion inicial, primero se convierte a string todo
var stringPosicionJugador = `${generarPosicionInicialJugador}`+"px";

document.getElementById("character").style.left = stringPosicionJugador;

//document.getElementById("enemigo").style.left = 24;

/***
 * 
 * En caso de no querer usar las imagenes, solo se puede utilizar 
 * document.getElementById("character").style.backgroundColor = jugador;
 * Y comentar el arreglo de arriba, y utilizar el arreglo de colores comentado 
 * */

document.getElementById("character").style.backgroundImage = jugador;


/**
 * CODIGO BASE ENCONTRADO
 */
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 2 + "px";
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
        character.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
            musicaMovimiento.play();
            
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
            musicaMovimiento.play();
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
    
});



var blocks = setInterval(function(){

    var tiempoTranscurrido = segundoTranscurrido;


    var blockLast = document.getElementById("block"+(counter-1));
    
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        //paramos el timer
        window.clearInterval(iniciarReloj);
        
        //alert("Game over. Score: "+(counter-9));
        var punteoJugador = counter-9;
        //sonido musica game over
        musicaGameOver.play();
        // Se le muestra el usuario un mensaje de game over personalizado y se le pregunta si quiere reiniciar el juego
        mensajeGameOver(punteoJugador);
        //location.reload();
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
    actualizarEscenarioJuego(tiempoTranscurrido,(counter-1));

},1);

