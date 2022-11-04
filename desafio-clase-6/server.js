                //  EJEMPLO SIN EXPRESS
                
                // const http = require("http")


                // const server = http.createServer((peticiom, respuesta) => {
                //     respuesta.end("Hola silvia")
                // })

                // const connectedServer = server.listen(8080, () => {
                //     console.log("Servidor escuchando en el 8080")
                // })

const fs = require("fs")
const express = require("express")

const app = express()

class Contenedor {
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.productos = [];
    
    }
    async read(){
        try{
            let existe = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            return existe
        }catch(error){
            console.log("Error en read" + error)
        }
    }
    getId(){
        const length = this.productos.length

        if (length === 0){
            return 0
        }else{
             return this.productos.length
        }
    }
    async save(producto){
        const id = this.getId()
  
        this.productos.push({
            ...producto, ...{id : id +1}
        })
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, 2));
        }
        catch (error) {
            console.log("Error en save" + error)      
        }
    }
    async getById(id) {
        const idEncontrado = await this.productos.find((ele) => ele.id === id)
        return idEncontrado
        // try {
        //     console.log(idEncontrado  )
        // }
        // catch(error) {
        //     console.log ("Error en getById" + error)
        // }
    }
    async getAll() {
         const funcGetAll = await this.productos
         return funcGetAll
        //  try{
        //      console.log(this.productos)
        //  }
        //  catch(error){
        //      console.log("Error en getAll" + error)
        //  }
     }
    async leoAll(){
        const arch = await fs.promises.readFile(this.nombreArchivo, "utf-8")
        try{
            const archOrigen = JSON.parse(arch)
            return archOrigen
        }
        catch(error){
            console.log("Error en leoAll" + error)
        }
    }
    async deleteById(id){
        let archivoCompleto = await this.leoAll()
        let nuevoArchivo = archivoCompleto.filter(ele => ele.id !== id)
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoArchivo, null, 2))
        try{
            console.log(`"Registro ${id} borrado correctamente"`)
        }
        catch(error){
            console.log("Error en deleteById" + error)
        }
    }
    async deleteAll() {
        await fs.promises.unlink("./productos.txt")
            try {
               
                console.log ("Archivo eliminado correctamente")
            }
            catch(error) {
                console.log("Error en borrar el archivo" + error)
            }
     }
}

const registro = new Contenedor ("./productos.txt")



 registro.save({"title" : "title 1", "price" : 100, "thumbnail" :"./espejo1.jpg"})
 registro.save({"title" : "title 2", "price" : 200, "thumbnail" :"./pintura2.jpg"})
 registro.save({"title" : "title 3", "price" : 300, "thumbnail" :"./accesorio4.jpg"})
 registro.save({"title" : "title 4", "price" : 400, "thumbnail" :"./pintura2.jpg"})
 registro.save({"title" : "title 5", "price" : 500, "thumbnail" :"./espejo1.jpg"})
 registro.save({"title" : "title 6", "price" : 600, "thumbnail" :"./pintura2.jpg"})
 registro.save({"title" : "title 7", "price" : 700, "thumbnail" :"./accesorio4.jpg"})


app.get("/", (req, res) => {
    res.send("Bienvenidos al proyecto de Silvia Gonzalves Fariña")
})


app.get("/productos", async ( req, res ) => {
    const todosLosProductos = await registro.getAll()
    try {
        res.send(todosLosProductos)
    }
    catch {
        res.send("error en getAll")
    }
})

app.get("/productosRandom", async (req, res) => {
    const numeroAleatorio = parseInt((Math.random() * 7) + 1)
    const registroAleatorio = await registro.getById(numeroAleatorio)
    try {
        res.send(registroAleatorio)
    }
    catch {
        res.send("registro no encontrado")
    }
})


const server = app.listen(8080, () => {
    console.log("Servidor escuchando por el puerto 8080")
})

server.on("err",error => console.log ("Hubo un error" + error))