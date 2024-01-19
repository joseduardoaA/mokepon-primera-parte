let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    /*Con la propiedad .style.display = "none" podemos ocultar elementos de HTML
      Si lo escribimos .style.display = "block" podemos volver a verlo */
    sectionSeleccionarAtaque.style.display = "none"
    
    // Aqui le estoy diciendo que botonMascotaJugador va atener el valor de document.getElementById("boton-mascota") lo que hace es buscar el elemento ppor el ID, el ID se lo pasamos por comillas y una vez encontrado lo podemos nanipular
    let botonMascotaJugador = document.getElementById("boton-mascota") 
    botonMascotaJugador.addEventListener("click", seleccionarMacotaJugador)
    let botonFuego = document.getElementById("boton-fuego") 
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua") 
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra") 
    botonTierra.addEventListener("click", ataqueTierra)
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"
}
function seleccionarMacotaJugador () {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"

    let inputHipodogue = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "block"
    // Si el elemento con ID Hipoge tiene la propiedad CHECKED va a disparar una alerta
    if (inputHipodogue.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
    } else{
        alert("Seleciona una mascota")
        reiniciarJuego()}
    seleccionarMacotaEnemigo()
}
function seleccionarMacotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = ("Hipodoge")
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = ("Capipepo")
    } else {
        spanMascotaEnemigo.innerHTML = ("Ratigueya")
    }
}

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
    
}
function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo  () {
    let ataqueAleatorio = aleatorio(1,3)
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    batalla()
}

function batalla () { 
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE")
    } else if (ataqueJugador =="FUEGO" && ataqueEnemigo == "TIERRA" || ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO" || ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo 
    }else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}
function revisarVidas () {
    if(vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES! Ganaste 🎉😊")
        
    } else if (vidasJugador == 0)[
        crearMensajeFinal("Lo siento, perdiste 😔")
    ]
}

function crearMensaje (resultado) {
    let sectionMensajes = document.getElementById("mensajes")
    let parrafo =  document.createElement("p")
    parrafo.innerHTML = `Tu mascota ataco con ${ataqueJugador}, la mascota del enemigo ataco con ${ataqueEnemigo} - ${resultado}`
    sectionMensajes.appendChild(parrafo)
}
function crearMensajeFinal (resultadoFinal) {
    let sectionMensajes = document.getElementById("mensajes")
    let parrafo =  document.createElement("p")
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

// Con esto hacemos que los botones queden deshabilitados cuando se envie el mensaje final 
    let botonFuego = document.getElementById("boton-fuego") 
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua") 
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-tierra") 
    botonTierra.disabled = true
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.style.display = "block"

}

// Esta funcion nos ayuda a reiniciar el juego con el metodo location.reload()
function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor( Math.random()* (max - min + 1)+min)
}

window.addEventListener("load", iniciarJuego)