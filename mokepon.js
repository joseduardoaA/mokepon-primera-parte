const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota") 
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const botonReiniciar = document.getElementById("boton-reiniciar")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataque-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")


let mokepones = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputRatigueya 
let inputHipodogue 
let inputCapipepo 
let mascotaJugador
let ataquesMokepon
let botonTierra
let botones = []
let botonFuego 
let botonAgua
let ataquesMokeponEnemigo
let ataqueJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
    
}

// Estos son Objetos-Instancia porque se construyen a partir de una clase, solo les colocamos las propiedades, la clase Mokepon
let hipodoge = new Mokepon("hipodoge","mokepons_mokepon_hipodoge_attack.png", 3 )
let capipepo = new Mokepon("capipepo","mokepons_mokepon_capipepo_attack.png", 3 )
let ratigueya = new Mokepon("ratigueya","mokepons_mokepon_ratigueya_attack.png", 3 )

/* Esto es un Objeto Literal poruqe se crea de 0 y solo van a guardar informacion
 Creo un Objeto, le coloco nombre y su ID que es la misma que en el HTML  */
hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌿", id: "boton-tierra"},
)
capipepo.ataques.push(
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
)
ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    /*Con la propiedad .style.display = "none" podemos ocultar elementos de HTML
      Si lo escribimos .style.display = "block" podemos volver a verlo */
    sectionSeleccionarAtaque.style.display = "none"

    mokepones.forEach((mokepon)=> {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon"  for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputRatigueya = document.getElementById("ratigueya")
        inputHipodogue = document.getElementById("hipodoge")
        inputCapipepo = document.getElementById("capipepo")
    })
    botonMascotaJugador.addEventListener("click", seleccionarMacotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"
}
function seleccionarMacotaJugador () {
    sectionSeleccionarMascota.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    // Si el elemento con ID Hipoge tiene la propiedad CHECKED va a disparar una alerta
    if (inputHipodogue.checked) {
        spanMascotaJugador.innerHTML = inputHipodogue.id
        mascotaJugador = inputHipodogue.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id 
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id 
        mascotaJugador = inputRatigueya.id
    } else{
        alert("Seleciona una mascota")
        reiniciarJuego()}

    extraerAtaques(mascotaJugador) 

    seleccionarMacotaEnemigo()
    function extraerAtaques (mascotaJugador) {
        let ataques 
        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador === mokepones[i].nombre) {
                ataques = mokepones[i].ataques
            }
        }

        mostrarAtaques(ataques)
    }


    function mostrarAtaques (ataques) {
        ataques.forEach((ataque) =>{
            ataquesMokepon = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`
            contenedorAtaques.innerHTML += ataquesMokepon
        })
        botonTierra = document.getElementById("boton-tierra") 
        botonFuego = document.getElementById("boton-fuego") 
        botonAgua = document.getElementById("boton-agua") 
        botones = document.querySelectorAll(".BAtaque")

    }
}


function secuenciaDeAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMacotaEnemigo() {
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaDeAtaque ()
}
function ataqueAleatorioEnemigo  () {
    let ataqueAleatorio = aleatorio(1,ataquesMokeponEnemigo.length -1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    iniciarPelea()
}


function iniciarPelea () {
    if (ataqueJugador.length === 5) {
        batalla()
    }
}



function indexAmbosOponentes (jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}



function batalla () {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[i] === "FUEGO" && ataqueEnemigo[i] === "TIERRA") {
            indexAmbosOponentes(i,i) 
            crearMensaje("GANASTE")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador 
        } else if (ataqueJugador[i] === "AGUA" && ataqueEnemigo[i] === "FUEGO") {
            indexAmbosOponentes(i,i) 
            crearMensaje("GANASTE")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador 
        } else if (ataqueJugador[i] === "TIERRA" && ataqueEnemigo[i] === "AGUA") {
            indexAmbosOponentes(i,i) 
            crearMensaje("GANASTE")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador 
        } else {
            indexAmbosOponentes(i,i) 
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo 
        }
    }
    revisarVidas()
}
function revisarVidas () {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE!!!")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES Ganaste")
    } else {
        crearMensajeFinal("Lo siento, perdiste 😔")
    }
}
function crearMensaje (resultado) {
    let nuevoAtaqueDelJugador =  document.createElement("p")
    let nuevoAtaqueDelEnemigo =  document.createElement("p")
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
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