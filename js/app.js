
let playerId;
let playerRef;
let RoomRef;
let skin;
let accion;
let codeGame;
let cierre;

/**
 *
 * @param {*} lengthArray : representa el valor maximo del numero a generar
 * @param {*} minNumber : representa el valor minimo del numero a generar
 * @returns : devuelve el numero generado
 * Se utiliza para devolver una posicion de los numeros
 * del arreglo que contiene las imagenes de game over, imagen del player o color del jugador
 */
 function genPosition(lengthArray, minNumber) {
    var number = Math.floor(Math.random() * lengthArray + minNumber);
    return number;
}

/**
 *
 * guarda sesion del usuario. Crea o une a un jugador a un room
 */
function enterMultiplayer() {
    var name = document.getElementById("nombre").value;
    codeGame = document.getElementById("codigo").value;
    name = name.trim();
    codeGame = codeGame.trim();
    /*
    * playerLeft: representa la posicion mas a la izquierda donde el jugador puede estar
    * playerRigth: representa la posicion mas a la DERECHA donde el jugador puede aparecer al iniciar el juego
    */
    if (name != null && name != "" && codeGame != null && codeGame != "") {
        if (accion == 1 && accion != null && accion != undefined && accion != "") {
            //genera sala de juego y asocia al jugador a la sala, se limita a 5 jugadores por sala
            RoomRef = firebase.database().ref(`rooms/${codeGame}`);
            RoomRef.set({
                id: codeGame,
                limit: 5,
                conections: 0
            });
            var playerleft = 2;
            var playerRigth = 373;
            var position = genPosition(playerRigth, playerleft);
            playerRef.set({
                id: playerId,
                name: name,
                skin: skin,
                x: position,
                y: 0,
                transform: null,
                buff: 0,
                room: codeGame
            }); 
            //playerRef.onDisconnect().remove();
            RoomRef.update({
                conections: 1
            });
            //RoomRef.onDisconnect().remove();
            cierre = false;
            /*window.addEventListener('beforeunload', function (e) {
                unloadAct1();
                do {
                    console.log("prevent");
                } while (!cierre);
            })*/
            
            window.location="../game.html?game=" + codeGame + "&player=" + playerId;
        } else if (accion == 0 && accion != null && accion != undefined && accion != "") {            
            //busca sala de juego, verifica si existe y asocia al jugador a la sala, si no ha sobrepasado el limite
            RoomRef = firebase.database().ref(`rooms/${codeGame}`);

            RoomRef.once("value", (snapshot) => {
                roomdata = snapshot.val();
                if (roomdata != null) {
                    if (roomdata.conections < roomdata.limit) {
                        var playerleft = 2;
                        var playerRigth = 373;
                        var position = genPosition(playerRigth, playerleft);
                        playerRef.set({
                            id: playerId,
                            name: name,
                            skin: skin,
                            x: position,
                            y: 0,
                            transform: null,
                            buff: 0,
                            room: roomdata.id
                        });
                        RoomRef.update({
                            conections: roomdata.conections + 1
                        });
                        //playerRef.onDisconnect().remove();
                        cierre = false;
                        /*window.addEventListener('beforeunload', function (e) {
                            unloadAct0();
                            do {
                                console.log("prevent");
                            } while (!cierre);
                        })*/
                        window.location="../game.html?game=" + codeGame + "&player=" + playerId;
                    } else {
                        mensaje("Ya no hay espacio en esta sala de juego.", 'warning');
                    }
                } else {
                    mensaje("La sala de juego que ha ingresado no existe", 'warning');
                }
            });
        }  
    } else {
        mensaje("Debe ingresar el codigo de juego y su nombre de jugador.", 'warning');
    }
}

function unloadAct1() {
    var players = firebase.database().ref(`players`);
    players.once("value", (snapshot) => {
        player = snapshot.val();
        if (player != null) {
            if (player.room == codeGame) {
                firebase.database().ref(`players/${player.id}`).remove();
            }
        }
    });
}

function unloadAct0() {
    var rooms = firebase.database().ref(`rooms/${codeGame}`);
    rooms.once("value", (snapshot) => {
        dataroom = snapshot.val();
        if (dataroom != null) {
            RoomRef.update({
                conections: dataroom.conections - 1
            });
        }
        cierre = true;
    });
}

function mensaje(mensaje, icon) {
    Swal.fire({
        text: mensaje,
        icon: icon,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
        footer:'<span style="color:blue">Proyecto CC8 Game 2022</span>',
        //Bloquear hasta que haya una accion de click de continuar o cancelar
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        stopKeydownPropagation:false
    })
}

(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    accion = urlSearchParams.get("act");
    if((accion == 1 || accion == 0) && accion != null && accion != undefined && accion != ""){
        if (accion == 1) {
            document.getElementById("tituloAccion").textContent = "Creando Juego";
        } else {
            document.getElementById("tituloAccion").textContent = "Uniendose a un Juego";
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                playerId = user.uid;
                playerRef = firebase.database().ref(`players/${playerId}`);
                var skins =  ["goku.gif","kirby.gif","sonic.gif","picachu.gif","mario.gif","pacman.gif"];
                var positionSkin = genPosition(skins.length, 0);
                skin = skins[positionSkin];
                document.getElementById("skinPlayer").style.backgroundImage = "url(../img/" + skin + ")";
                if (positionSkin == 3) {
                    document.getElementById("skinPlayer").style.width = "130px";
                }
            }
        })
        firebase.auth().signInAnonymously().catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    } else {
        document.getElementById("ingresoLobby").classList.add("hidden");
        document.getElementById("nodataLobby").classList.remove("hidden");
    }
})();

