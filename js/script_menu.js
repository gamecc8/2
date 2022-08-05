const menuShowBtn = document.getElementById('menu-show-btn');
const menuHideBtn = document.getElementById('menu-hide-btn');
const menuOverlay = document.querySelector('.nav-overlay');

menuShowBtn.addEventListener('click', () => menuOverlay.classList.add('show-overlay'));
menuHideBtn.addEventListener('click', () => menuOverlay.classList.remove('show-overlay'));

function toLobby(accion) {
    window.location="views/lobby.html?act=" + accion;
}