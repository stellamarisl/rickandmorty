const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
mostrarHTMLDetalles = document.querySelector("#detalles-contenedor")
SeccionPersonajes = document.querySelector("#tarjeta")
SeccionDetalles = document.querySelector("#detalle")

let paginaActual = 1
let ultimaPagina = 0



const buscarPersonajes = () =>{
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        ultimaPagina = data.info.pages
        mostrarHTMLPersonajes(data.results)
        asignarClickTarjetaPersonaje()
    })
}

const buscarPersonaje = (id) =>{
    fetch(`https://rickandmortyapi.com/api/character/?${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //crearVistaPersonaje()
    })
}
buscarPersonaje()

const buscarDetalle = (id) =>{
    fetch(`https://rickandmortyapi.com/api/character/?${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //crearVistaDetalle()
    })
}
buscarDetalle()




const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta")
    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].onclick = () => {
            const idPersonaje = tarjetas[i].dataset.id
            buscarPersonaje(idPersonaje)
            console.log(idPersonaje)

            const idDetalle = tarjetas[i].dataset.id
            buscarDetalle(idDetalle)
            console.log(idDetalle)

            SeccionPersonajes.style.display = "none"

            if (idPersonaje === idDetalle) {
                mostrarHTMLDetalles = (data) => {
                    const DetalleContenedor = document.querySelector("#detalles-contenedor")
                    const HTML = data.reduce((acc, curr) => {
                        return acc + `
                                <div class = "detalle" data-id=${curr.id}>
                            <h4>${curr.status}</h4>
                            <h4>${curr.species}</h4>
                            <h4>${curr.type}</h4>
                            <h4>${curr.gender}</h4>
                            <h4>${curr.origin.name}</h4>
                            <h4>${curr.location.name}</h4>
                            </div>
                            `
                    }, "")
                    DetalleContenedor.innerHTML = HTML
                }
            }

          SeccionDetalles.style.display = "flex"

        }
    }
}

const mostrarHTMLPersonajes = (personajes) =>{
    const tarjetasContenedor = document.querySelector("#tarjetas-contenedor")
    const html = personajes.reduce((acc, curr) =>{
        return acc + `
        <div class = "tarjeta" data-id=${curr.id}>
        <h2>${curr.name}</h2>
        <img src="${curr.image}"/>
        </div>
        `
    }, "")
     tarjetasContenedor.innerHTML = html
    }


buscarPersonajes()

//*****************PAGINACION**********************/
//next.onclick = () =>{
//    paginaActual ++
//    if(paginaActual > ultimaPagina){
//        next.disabled = true
//      }
//      if(paginaActual <= ultimaPagina){
//        prev.disabled = false
//    } 
    
//buscarPersonajes()
//}

//prev.onclick = () =>{
//    paginaActual --

//    if(paginaActual < 1){
//       prev.disabled = true
//    }
//    if(paginaActual >= 1){
//        prev.disabled = false
//    }
//    buscarPersonajes()
//}
//****************************************************//





//******************************peliculas******************** */

//const buscarPeliculas = () =>{
//    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActual}`)
//    .then(res => res.json())
//    .then(data =>{ 
//        //console.log(data)
//        ultimaPagina = data.info.pages
//        mostrarHTMLPeliculas(data.results)
//        //clickTarjetaPersonaje()
//    })
//}




//const  mostrarHTMLPeliculas = (peliculas) =>{
//    const pelicula = document.querySelector("#pelicula")
//    const html = peliculas.reduce((acc, curr) => {
//        return acc + `
//        <div class ="tarjetas-peliculas" data-id=${curr.id}>
//        <h2>${curr.name}</h2>
//        <h2>${curr.url}<h2/>
//        </div>
//        `
//    }, "")
//    pelicula.innerHTML = html
//}
//buscarPeliculas()




