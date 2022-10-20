


class Usuario {
    constructor (nombre,apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        console.log (`Nombre completo:  ${this.nombre} ${this.apellido}`)
    }
    addMascotas = (masc) => {
        this.mascotas.push(masc)
    }
    countMascotas(){
        console.log(this.mascotas.length)
    }
    addBook = (lib) => {
        this.libros.push(lib)
    }
    getBookNames(){
        // this.libros.forEach(element => {
        //     console.log(`${element.nombre}`)
        // });
        const newarray = this.libros.map((el) =>  el.nombre)
        return console.log(newarray)
             
         
    }
}

const usuario = new Usuario("Silvia","Gonzalves",
                            [{nombre : "Libro 1",
                              autor : "Autor 1"
                            },
                            {nombre : "Libro 2",
                             autor : "Autor 2"
                            },
                            {nombre : "Libro 3",
                             autor : "Autor 3"
                            },
                            {nombre : "Libro 4",
                             autor : "Autor 4"
                            }],
                            ["perro", "gato", "pez", "ardillas"]
                            )

console.log(usuario)
usuario.getFullName()

usuario.addMascotas("loro")
console.log(usuario)

usuario.countMascotas()

usuario.addBook({nombre : "Libro 5", autor : "Autor 5"})
console.log(usuario)

usuario.getBookNames()
