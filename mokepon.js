const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota") 
const botonReiniciar = document.getElementById("boton-reiniciar")
const botonTierra = document.getElementById("boton-tierra") 
const botonFuego = document.getElementById("boton-fuego") 
const botonAgua = document.getElementById("boton-agua") 

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const inputRatigueya = document.getElementById("ratigueya")
const inputHipodogue = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataque-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataque-del-enemigo")

let mokepones = []
let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
    
}

let hipodoge = new Mokepon("Hipodoge", "assets/mokepons_mokepon_hipodoge_attack.png", 3 )
let capipepo = new Mokepon("Capipepo", "assets/mokepons_mokepon_capipepo_attack.png", 3 )
let ratigueya = new Mokepon("Ratigueya", "assets/mokepons_mokepon_ratigueya_attack.png", 3 )

mokepones.push(hipodoge, capipepo, ratigueya)
console.log(mokepones)

function iniciarJuego() {
    /*Con la propiedad .style.display = "none" podemos ocultar elementos de HTML
      Si lo escribimos .style.display = "block" podemos volver a verlo */
    sectionSeleccionarAtaque.style.display = "none"
    // Aqui le estoy diciendo que botonMascotaJugador va atener el valor de document.getElementById("boton-mascota") lo que hace es buscar el elemento ppor el ID, el ID se lo pasamos por comillas y una vez encontrado lo podemos nanipular
    botonMascotaJugador.addEventListener("click", seleccionarMacotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"
}
function seleccionarMacotaJugador () {
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
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
        crearMensajeFinal("FELICITACIONES! Ganaste 🎉")
        
    } else if (vidasJugador == 0)[
        crearMensajeFinal("Lo siento, perdiste 😔")
    ]
}
function crearMensaje (resultado) {
    let nuevoAtaqueDelJugador =  document.createElement("p")
    let nuevoAtaqueDelEnemigo =  document.createElement("p")
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    // parrafo.innerHTML = `Tu mascota ataco con ${ataqueJugador}, la mascota del enemigo ataco con ${ataqueEnemigo} - ${resultado}`
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal (resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
// Con esto hacemos que los botones queden deshabilitados cuando se envie el mensaje final 
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
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