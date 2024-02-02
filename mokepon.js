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

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
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
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "mokemap.png"
let mascotaJugadorObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800


mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0

    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
    
}

// Estos son Objetos-Instancia porque se construyen a partir de una clase, solo les colocamos las propiedades, la clase Mokepon
let hipodoge = new Mokepon("hipodoge","mokepons_mokepon_hipodoge_attack.png", 5, "hipodoge.png")
let capipepo = new Mokepon("capipepo","mokepons_mokepon_capipepo_attack.png", 5, "capipepo.png" )
let ratigueya = new Mokepon("ratigueya","mokepons_mokepon_ratigueya_attack.png", 5, "ratigueya.png" )

let hipodogeEnemigo = new Mokepon("hipodoge","mokepons_mokepon_hipodoge_attack.png", 5, "hipodoge.png")
let capipepoEnemigo = new Mokepon("capipepo","mokepons_mokepon_capipepo_attack.png", 5, "capipepo.png")
let ratigueyaEnemigo = new Mokepon("ratigueya","mokepons_mokepon_ratigueya_attack.png", 5, "ratigueya.png")


/* Esto es un Objeto Literal poruqe se crea de 0 y solo van a guardar informacion
 Creo un Objeto, le coloco nombre y su ID que es la misma que en el HTML  */
hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌿", id: "boton-tierra"},
)
hipodogeEnemigo.ataques.push({nombre:'💧',id:'boton-agua'},{nombre:'💧',id:'boton-agua'},{nombre:'💧',id:'boton-agua'},{nombre:'🔥',id:'boton-fuego'},{nombre:'🌱',id:'boton-tierra'},)
capipepo.ataques.push(
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
)
capipepoEnemigo.ataques.push({nombre:'🌱',id:'boton-tierra'},{nombre:'🌱',id:'boton-tierra'},{nombre:'🌱',id:'boton-tierra'},{nombre:'💧',id:'boton-agua'},{nombre:'🔥',id:'boton-fuego'},)
ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌿", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
)
ratigueyaEnemigo.ataques.push({nombre:'🔥',id:'boton-fuego'},{nombre:'🔥',id:'boton-fuego'},{nombre:'🔥',id:'boton-fuego'},{nombre:'💧',id:'boton-agua'},{nombre:'🌱',id:'boton-tierra'},)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    /*Con la propiedad .style.display = "none" podemos ocultar elementos de HTML
      Si lo escribimos .style.display = "block" podemos volver a verlo */
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

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

    unirseAlJuego()


function unirseAlJuego () {
    fetch("http://localhost:5580/unirse")
    .then(function (res) {
        if (res.ok) {
            res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })}

    botonReiniciar.style.display = "none"
}
function seleccionarMacotaJugador () {
    sectionSeleccionarMascota.style.display = "none"
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
    
    seleccionarMokepon(mascotaJugador)



    extraerAtaques(mascotaJugador)         
    sectionVerMapa.style.display = "flex"
    iniciarMapa()}


    function seleccionarMokepon(mascotaJugador){fetch(`http://localhost:5580/mokepon/${jugadorId}`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({mokepon:mascotaJugador})})}
    function extraerAtaques(mascotaJugador){let ataques
    for(let i=0;i<mokepones.length;i++){if(mascotaJugador===mokepones[i].nombre){ataques=mokepones[i].ataques}}
    mostrarAtaques(ataques)}

function extraerAtaques (mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques}}
            mostrarAtaques(ataques)}


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



function secuenciaDeAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMacotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaDeAtaque ()
}
function ataqueAleatorioEnemigo(){console.log('Ataques enemigo',ataquesMokeponEnemigo);let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length-1)
if(ataqueAleatorio==0||ataqueAleatorio==1){ataqueEnemigo.push('FUEGO')}else if(ataqueAleatorio==3||ataqueAleatorio==4){ataqueEnemigo.push('AGUA')}else{ataqueEnemigo.push('TIERRA')}
console.log(ataqueEnemigo)
iniciarPelea()}
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
    // botonReiniciar.style.display='block'
// Con esto hacemos que los botones queden deshabilitados cuando se envie el mensaje final 
    botonReiniciar.style.display = "block"
}
// Esta funcion nos ayuda a reiniciar el juego con el metodo location.reload()
function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max){
    return Math.floor( Math.random()* (max - min + 1)+min)
}

function pintarCanvas () {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
    }
    
    
function moverDerecha () {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda () {
    mascotaJugadorObjeto.velocidadX = - 5

}
function moverArriba () {
    mascotaJugadorObjeto.velocidadY = - 5

}
function moverAbajo () {
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento () {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}


function sePresionaUnaTecla (event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}


function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMacota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionaUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}



function obtenerObjetoMacota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }

    // mostrarAtaques(ataques)
}

function revisarColision(enemigo) {
    const arribaMascota = 
    mascotaJugadorObjeto.y
    const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
    mascotaJugadorObjeto.x


    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.y + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    } 
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colision")
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    // alert(`Haz colisionado con ${enemigo.nombre}`)
    seleccionarMacotaEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)