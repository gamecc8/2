// contiene la musica que se utiliza en el juego
const musicaGameOver = new Audio('music/explosion.wav');
const musicaInicioJuego = new Audio('music/random.wav');

var character;
var blocks;
var initPlayer;
var codeGame;
var endGame = false;


// Posibles imagenes para imprimir en game over
var arregloIconoGameOver = ["gameover1.png", "gameover2.png"];
var tamanoImagenGameOver = 256;


/**
 *
 * @param {*} longitudArreglo : representa el valor maximo del numero a generar
 * @param {*} numeroMinimo : representa el valor minimo del numero a generar
 * @returns : devuelve el numero generado
 * la funcion generarPosicionArreglo se utiliza para devolver una posicion de los numeros
 * del arreglo que contiene las imagenes de game over, imagen del player o color del jugador
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
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    if(segundosJugando==10){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==20){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==30){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==40){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==50){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==60){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==70){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==80){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==90){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==100){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==110){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==120){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==130){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==140){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==150){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==160){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==170){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==180){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==190){
        updateEscaleras(contador,"#"+randomColor);
    }else if(segundosJugando==200){
        updateEscaleras(contador,"#"+randomColor);
    }else{
        updateEscaleras(contador,"black");
    }
}

/**
 * CODIGO BASE ENCONTRADO
 */
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

// devuelve ancho de contenido
var anchoContenido = window.innerWidth;
var valorMaximoContenido = 400;
var valoresMovimiento1 = 5; 
var valoresMovimiento2 = 2; 

var valorDerecha = 58;

var valorEscalera = 480;

var defaultValorContenido = 380;

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left > 0){
        var newleft;
        if(anchoContenido < valorMaximoContenido){
            newleft = left - valoresMovimiento1;
        }else{
            newleft = left - valoresMovimiento2;
        }
        character.style.left = newleft + "px";
        if (!endGame) {
            var playerRef = firebase.database().ref(`players/${initPlayer}`);
            playerRef.update({
                x: newleft
            });
        }
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(anchoContenido < valorMaximoContenido){
        var num = anchoContenido - valorDerecha;
    }else{
        var num = defaultValorContenido;
    }
    if(left < num){
        var newleft;
        if(anchoContenido < valorMaximoContenido){
            newleft = left + valoresMovimiento1;
        }else{
            newleft = left + valoresMovimiento2;
        }
        character.style.left = newleft + "px";
        if (!endGame) {
            var playerRef = firebase.database().ref(`players/${initPlayer}`);
            playerRef.update({
                x: newleft
            });
        }
    }

}
//necesario para utilizarse en computadoras
document.addEventListener("keydown", event => {
    var musicaMovimiento = new Audio('music/laserShoot.wav');

    if(both==0){
        both++;

        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
            musicaMovimiento.play();
            // al presionar la tecla de la izquierda se refleja la imagen en esa direccion
            character.style.transform = 'scaleX(-1)';
            if (!endGame) {
                var playerRef = firebase.database().ref(`players/${initPlayer}`);
                playerRef.update({
                    transform: 'scaleX(-1)'
                });
            }
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
            musicaMovimiento.play();
            character.style.transform = 'scaleY(1)';
            if (!endGame) {
                var playerRef = firebase.database().ref(`players/${initPlayer}`);
                playerRef.update({
                    transform: 'scaleY(1)'
                });
            }
        }
        
    }
   
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;

});

function base() {
    blocks = setInterval(function(){

        var tiempoTranscurrido = segundoTranscurrido;


        var blockLast = document.getElementById("block"+(counter-1));

        var holeLast = document.getElementById("hole"+(counter-1));

        if(counter>0){
            var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
            var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        }
        if(blockLastTop<valorMaximoContenido||counter==0){
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

        var valorQuitarGameOver = 9;

        if(characterTop <= 0){
            //paramos el timer
            window.clearInterval(iniciarReloj);
            endGame = true;
            //alert("Game over. Score: "+(counter-9));
            var punteoJugador = counter-valorQuitarGameOver;
            //sonido musica game over
            musicaGameOver.play();
            // Se le muestra el usuario un mensaje de game over personalizado y se le pregunta si quiere reiniciar el juego
            mensajeGameOver(punteoJugador);
            //location.reload();
        } else {
            var contador  = 0;
            let current;
            let iblock;
            let ihole;
            let iblockTop;
            let iholeLeft;

            while (contador < currentBlocks.length){
                current = currentBlocks[contador];
                iblock = document.getElementById("block"+current);
                ihole = document.getElementById("hole"+current);
                iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
                iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
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
                contador++;
            }
            if(drop==0){
                if(characterTop < valorEscalera){
                    character.style.top = characterTop + 2 + "px";
                    if (!endGame) {
                        var playerRef = firebase.database().ref(`players/${initPlayer}`);
                        playerRef.update({
                            y: characterTop + 2
                        });
                    }
                }
            }else{
                character.style.top = characterTop - 0.5 + "px";
                if (!endGame) {
                    var playerRef = firebase.database().ref(`players/${initPlayer}`);
                    playerRef.update({
                        y: characterTop - 0.5
                    });
                }
            }
            actualizarEscenarioJuego(tiempoTranscurrido,(counter-1));
        }
    },1);
}

/**
 * 
 * @param {*} movimientoHacia : representa si el movimiento es izquierda o derecha
 * moveLeft y moveRight son funciones ya implementadas arriba
 */
function tipoMovimiento(movimientoHacia){
    if (movimientoHacia=="izquierda") {
        interval = setInterval(moveLeft, 1);
        // al presionar la tecla de la izquierda se refleja la imagen en esa direccion
        character.style.transform = 'scaleX(-1)';
        if (!endGame) {
            var playerRef = firebase.database().ref(`players/${initPlayer}`);
            playerRef.update({
                transform: 'scaleX(-1)'
            });
        }
        both++;
    }else if(movimientoHacia=="derecha"){
        interval = setInterval(moveRight, 1);
        character.style.transform = 'scaleY(1)';
        if (!endGame) {
            var playerRef = firebase.database().ref(`players/${initPlayer}`);
            playerRef.update({
                transform: 'scaleY(1)'
            });
        }
        both++;
    }else{
        clearInterval(interval);
        both=0;
    }
}

/**
 *
 * @param {*} nombreIDControlDiv : representa el nombre del div que se utiliza
 * @param {*} nombreEventoListener : puede ser evento de mousedown, mouseup, touchstar, touchend
 * @param {*} movimientoHacia : izquierda o derecha
 */
function eventoControl(nombreIDControlDiv,nombreEventoListener,movimientoHacia){
    document.getElementById(nombreIDControlDiv).addEventListener(nombreEventoListener,
        function(){
            tipoMovimiento(movimientoHacia);
        });
}
eventoControl("left","mousedown","izquierda");
eventoControl("left","mouseup","otro");
eventoControl("left","touchstart","izquierda");
eventoControl("left","touchend","otro");
eventoControl("right","mousedown","derecha");
eventoControl("right","mouseup","otro");
eventoControl("right","touchstart","derecha");
eventoControl("right","touchend","otro");

document.addEventListener('DOMContentLoaded', function () {
    firebase.auth().onAuthStateChanged((user) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        initPlayer = urlSearchParams.get("player");
        codeGame = urlSearchParams.get("game");
        var players = firebase.database().ref(`players`);
        players.once("value", (snapshot) => {
            playerdata = snapshot.val() || {};
            Object.keys(playerdata).forEach((key) => {
                let player = playerdata[key];
                if (player != null && player.room == codeGame) {
                    var chElement = document.createElement("div");
                    chElement.setAttribute("id", "character" + player.id);
                    chElement.setAttribute("class", "character");
                    chElement.setAttribute("data-name", player.name);
                    var parentgame = document.getElementById("game");
                    parentgame.appendChild(chElement);
                    if (player.id == initPlayer) {
                        character = document.getElementById("character" + player.id);
                    }
                    document.getElementById("character" + player.id).style.left =player.x + "px";
                    document.getElementById("character" + player.id).style.backgroundImage = "url(img/" + player.skin + ")";
                }
            })
            base();
            snoof();
        });
    })
    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
  }, false);
  
  function snoof() {
    var players = firebase.database().ref(`players`);
    players.on("value", (snapshot) => {
        playerdata = snapshot.val() || {};
        Object.keys(playerdata).forEach((key) => {
            let player = playerdata[key];
            if (player != null && player.id != initPlayer && player.room == codeGame) {
                var jugador = document.getElementById("character" + player.id);
                jugador.style.left = player.x + "px";
                jugador.style.top = player.y + "px";
                jugador.style.transform = player.transform;
            }
        })
    });
  }