/**********  CODIGO AGREGADO GRUPO : mensajeGameOver
 * 
 * Mensaje de Game Over, para mostrar un mensaje atractivo
 * se utiliza <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
 * se manda a llamar desde el archivo index.html
 * 
 * ***********/
 function mensajeGameOver(punteoAcumulado){
    Swal.fire({
        title: 'GAME OVER. Punteo: '+punteoAcumulado,
        text: "Para reiniciar el juego presiona el boton",
        icon: 'error',
        imageUrl: iconoGameOver,
        imageWidth: tamanoImagenGameOver,
        imageHeight: tamanoImagenGameOver,
        imageAlt: 'Imagen',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reiniciar juego',
        footer:'<span style="color:blue">Proyecto CC8 Game 2022</span>',
        //Bloquear hasta que haya una accion de click de continuar o cancelar
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        stopKeydownPropagation:false

      }).then((result) => {
        // Si se presiona el boton de confirmar
        if (result.isConfirmed) {
           
            location.reload();
        }
        
      })
      clearInterval(blocks);

}