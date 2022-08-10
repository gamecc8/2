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

// Random del color del player del jugador, tomando en cuenta que son varios jugadores
//var arregloColorJugador =  ["red", "blue","pink","crimson","green","#DED822","#5BDE22","#22BCDE","#A7B2B5","#C381FD","#FD81DF"];
//var arregloColorJugador =  ["url(img/soccer.png)","url(img/tennis.png)","url(img/basketball.png)","url(img/volleyball.png)","url(img/beach-ball.png)","url(img/tierra.png)","url(img/venus.png)","url(img/marte.png)","url(img/kirby.gif)","url(img/sonic.gif)","url(img/picachu.gif)"];
//var arregloColorJugador =  ["url(img/goku.gif)","url(img/kirby.gif)","url(img/sonic.gif)","url(img/picachu.gif)"];

//var longitudArregloColorJugador = arregloColorJugador.length;

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
/*
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
}*/
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

//var randomColor = generarPosicionArreglo(longitudArregloColorJugador,0);
//var jugador = arregloColorJugador[randomColor];

/**
 * A partir se generara un rango de posicion donde el jugador puede aparece al iniciar el juego
    numeroMinimoPosicionJugador: representa la posicion mas a la izquierda donde el jugador puede estar
 *
 *  numeroMaximoPosicionJugador: representa la posicion mas a la DERECHA donde el jugador puede aparecer al iniciar el juego
*/
//var numeroMinimoPosicionJugador = 2;
//var numeroMaximoPosicionJugador = 373;
//var generarPosicionInicialJugador = generarPosicionArreglo(numeroMaximoPosicionJugador,numeroMinimoPosicionJugador);



//se posiciona el jugador a su posicion inicial, primero se convierte a string todo
//var stringPosicionJugador = `${generarPosicionInicialJugador}`+"px";

//document.getElementById("character").style.left = stringPosicionJugador;

/***
 *
 * En caso de no querer usar las imagenes, solo se puede utilizar
 * document.getElementById("character").style.backgroundColor = jugador;
 * Y comentar el arreglo de arriba, y utilizar el arreglo de colores comentado
 * */

//document.getElementById("character").style.backgroundImage = jugador;


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
    if(left > 0){
        var newleft;
        if(window.innerWidth < 400){
            newleft = left - 5;
        }else{
            newleft = left - 2;
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
    if(window.innerWidth < 400){
        var num = window.innerWidth - 58;
    }else{
        var num = 380;
    }
    if(left < num){
        var newleft;
        if(window.innerWidth < 400){
            newleft = left + 5;
        }else{
            newleft = left + 2;
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
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
            musicaMovimiento.play();
            character.style.transform = 'scaleY(1)';
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
            endGame = true;
            //alert("Game over. Score: "+(counter-9));
            var punteoJugador = counter-9;
            //sonido musica game over
            //musicaGameOver.play();
            // Se le muestra el usuario un mensaje de game over personalizado y se le pregunta si quiere reiniciar el juego
            //mensajeGameOver(punteoJugador);
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
        both++;
    }else if(movimientoHacia=="derecha"){
        interval = setInterval(moveRight, 1);
        character.style.transform = 'scaleY(1)';
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
                document.getElementById("character" + player.id).style.left =player.x + "px";
            }
        })
    });
  }