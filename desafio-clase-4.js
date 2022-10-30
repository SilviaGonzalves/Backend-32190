// importo el filesystem

const fs = require("fs");



// construyo la clase

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
        try {
            console.log(idEncontrado  )
        }
        catch(error) {
            console.log ("Error en getById" + error)
        }
    }

    async getAll() {
         await this.productos
         try{
             console.log(this.productos)
         }
         catch(error){
             console.log("Error en getAll" + error)
         }
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



 registro.getById(2)

 registro.getAll()

 registro.deleteById(3)

 registro.deleteAll()