const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const prevLocation= document.querySelector("#prev-location");
const nextLocation = document.querySelector("#next-location");
const prevEpisode= document.querySelector("#prev-episode");
const nextEpisode = document.querySelector("#next-episode");



const formCtnBarsSearch = document.querySelector("#ctn-bars-search");
const inputSearch = document.getElementById("#input-search");
const cerrarInputSearch = document.getElementById("cerrar-busqueda");
const seccionCharacter = document.getElementById("seccion-character");
const seccionLocation = document.getElementById("seccion-location");
const detalleLocation = document.getElementById("detalle-location");

const botonBusqueda = document.getElementById("#busqueda");



/*botonBusqueda.onclick = () =>{     MALE: ACA SE ME ROMPE TODO**
    inputSearch.value = "";                                     *
}                                                               *
*///////////////////////////////////////////////////////////////

////////**********buscando********************* */

const mostrarBuscador = ()=>{
    formCtnBarsSearch.style.top = "80px";
}

const ocultarBuscador = () =>{
    formCtnBarsSearch.style.top = "-10px";
    /*inputSearch.value= "";*/   /*ACA QUERIA QUE AL ESCRIBIR EN EL
                                   INPUT Y DESPUES DE CERRARSE QUE
                                   QUEDARA EN BLANCO Y NO LO LOGRE*/
    
}


document.getElementById("lupa").addEventListener("click", mostrarBuscador)
document.getElementById("cerrar-busqueda").addEventListener("click",ocultarBuscador)


/**************FIN BUSCADOR****************/

let paginaActual = 1
let ultimaPagina = 0

const buscarPersonajes = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            ultimaPagina = data.info.pages
            crearTarjetasPersonaje(data.results)
        })

}
buscarPersonajes()

const crearTarjetasPersonaje = (personaje) => {
    const tarjetas = document.querySelector("#tarjetas-personajes")
    const html = personaje.reduce((acc, curr) => {
        return acc + `
        <div class ="tarjetas" data-id=${curr.id}>
        <h2>${curr.name}</h2>
        <img  class="img-personaje" src="${curr.image}"/>
        
          <div  class="detalles" data-id=${curr.id}>
           <h4>Gender: ${curr.gender}</h4>
           <h4>Origin: ${curr.origin.name}</h4>
           <h4>Species: ${curr.species}</h4>
           <h4>Status: ${curr.status}</h4>
        </div>
        </div>
           `
    }, "")

    tarjetas.innerHTML = html
}

let paginaActualName = 1
let ultimaPaginaName = 0

 formCtnBarsSearch.onsubmit = (e) =>{
    e.preventDefault();
    buscarPersonajeFiltrado(inputSearch.value)
}

const buscarPersonajeFiltrado = (name) =>{
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
    .catch((error) =>{                     /*TUVE QUE HACER UN CATCH PORQUE ME 
                                             MANDABA ERROR 404 Y OTRAS VECES ERROR
                                             500 - CON ESO SE ARREGLO PERO ME TRABO EN
                                             LA LINEA 33*/
        console.log(error)
    })
    .then(res => res.json())
    .then(data => {
        crearTarjetasPersonaje(data.results)
        console.log(data.results)
    })
}
buscarPersonajeFiltrado()





//****************location***************************/
let paginaActualLocation = 1
let ultimaPaginaLocation = 0


const buscarLocacion = () => {
    fetch(`https://rickandmortyapi.com/api/location?page=${paginaActualLocation}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            ultimaPaginaLocation = data.info.pages
            crearTarjetasLocacion(data.results)
        })

}

const crearTarjetasLocacion = (locaciones) => {
    const location= document.querySelector("#tarjetas-locacion")
    const htmlLocacion = locaciones.reduce((acc, curr) => {
        return acc + `
        <div  class ="location" data-id=${curr.id}>
        <h4>${curr.name}</h4>
        <img class="img-tierra" src="imagenes/locacion.png" id="img-tierra">
        <h4>Dimension: ${curr.dimension}</h4>
        <h4>Residents: ${curr.residentes}</h4>
        </div>
           `
    }, "")
    nextLocation.onclick = () =>{
        paginaActualLocation ++
        if(paginaActualLocation > ultimaPaginaLocation){
            nextLocation.disabled = true
        }
          if(paginaActualLocation <= ultimaPaginaLocation){
            prevLocation.disabled = false
        } 
        
    buscarLocacion();
    }
    
    prevLocation.onclick = () =>{
        paginaActualLocation --
       if(paginaActualLocation < 1){
           prevLocation.disabled = true
        }
        if(paginaActualLocation >= 1){
            prevLocation.disabled = false
        }
        buscarLocacion();
    }


    location.innerHTML = htmlLocacion
}

buscarLocacion()


//******************EPISODES**********************/

let paginaActualEpisode = 1
let ultimaPaginaEpisode = 0


const buscarEpisode = () => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActualEpisode}`)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            ultimaPaginaEpisode = data.info.pages
            crearTarjetasEpisode(data.results)
        })

}

const crearTarjetasEpisode = (episodios) => {
    const episode= document.querySelector("#tarjetas-episode")
    const htmlEpisode = episodios.reduce((acc, curr) => {
        return acc + `
        <div  class ="episode" data-id=${curr.id}>
        <h4>${curr.name}</h4>
        <img class="img-tv" src="imagenes/tv.jpg" id="img-tv">

        <h4>Episode: ${curr.episode}</h4>
        <h4>Url: ${curr.url}</h4>
        </div>
           `
    }, "")
    nextEpisode.onclick = () =>{
        paginaActualEpisode ++
        if(paginaActualEpisode > ultimaPaginaEpisode){
            nextEpisode.disabled = true
        }
          if(paginaActualEpisode <= ultimaPaginaEpisode){
            prevEpisode.disabled = false
        } 
        
    buscarEpisode();
    }
    
    prevEpisode.onclick = () =>{
        paginaActualEpisode --
       if(paginaActualEpisode < 1){
           prevEpisode.disabled = true
        }
        if(paginaActualEpisode >= 1){
            prevEpisode.disabled = false
        }
        buscarEpisode();
    }


    episode.innerHTML = htmlEpisode
}

buscarEpisode()

//*****************PAGINACION PERSONAJES**********************/
next.onclick = () =>{
    paginaActual ++
    if(paginaActual > ultimaPagina){
        next.disabled = true
    }
      if(paginaActual <= ultimaPagina){
        prev.disabled = false
    } 
    
buscarPersonajes();
}

prev.onclick = () =>{
    paginaActual --
   if(paginaActual < 1){
       prev.disabled = true
    }
    if(paginaActual >= 1){
        prev.disabled = false
    }
    buscarPersonajes();
}
//****************************************************/









