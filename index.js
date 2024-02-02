const express=require("express")
const cors = require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const jugadores=[]

class Jugador{constructor(id){this.id=id}
asignarMokepon(mokepon) {
    this.mokepon = mokepon
}



}


class Mokepon {
    constructor (nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse",(req,res)=>{
    const id=`${Math.random()}`
    const jugador=new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)})


app.post("/mokepon/:jugadorId", (req, res) =>{
    const jugadorId = req.params.jugadorId 
    const nombre = req.body.mokepon || ""
    // const mokepon = New Mokepon(nombre) 
    // const 
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})
app.listen(5580,()=>{
    console.log("Servidor funcionando")
})