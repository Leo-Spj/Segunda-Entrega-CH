// fetch
const cargarPeliculas = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=276e470698d68800db5697223acb8a64&language=es-ES`);

        console.log(respuesta);
        
        //si la respuesta es correcta:
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            datos.results.forEach(pelicula => {

                arry_themoviedb.push(new informacion_peliculas(pelicula.title, pelicula.vote_average, pelicula.vote_count));

            });
            // tipos de errores:
        }else if(respuesta.status === 401){
            console.log ("llave erronea");
            
        }else if(respuesta.status === 404){
            console.log("La peli no existe")
        }else{
            console.log("WTF?")
        }

    }catch(error){
        console.log(error)
    }
}
cargarPeliculas();

const top_peliculas_tabla = document.querySelector("#top_peliculas_tabla");



class informacion_peliculas {
    
    constructor (nombre, voto_promedio, recuento_votos ){
        this.nombre = nombre;
        this.voto_promedio = voto_promedio;
        this.recuento_votos = recuento_votos;
    }
}
const arry_themoviedb = [ ];



class alumnos_lista {

    constructor (id, nombre, apellido ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
const alumno = [ ];

// alumnos de ejemplo dentro del array
/**
 alumno.push(new alumnos_lista (12312312, "Leonardo", "Espejo"));
 alumno.push(new alumnos_lista (23423423, "Claudia", "Guitton"));
 * 
*/

function almacenamiento_local(){
// JSON
    sessionStorage.clear()

    for(let i = 0; i < alumno.length; i++){
        
        
        let alumno_json = ("alumno-"+i);

        sessionStorage.setItem(alumno_json, JSON.stringify(alumno[i]))
    }
}

// Obteniendo el LocalStorage y pasarlo a funcion para imprimir:
function obtener_sessionStorage(){

    let longitud_session = sessionStorage.length;
    for(i = 0; i < longitud_session; i++){
        
        let alumno_guardado = JSON.parse( sessionStorage.getItem("alumno-"+i) );

        alumno.push(new alumnos_lista(alumno_guardado.id, alumno_guardado.nombre, alumno_guardado.apellido));
    }
    

}
obtener_sessionStorage()




const input_nombre = document.querySelector(".input_nombre");
const input_apellido = document.querySelector(".input_apellido");
const input_id = document.querySelector(".input_id");

const boton_formulario = document.querySelector(".boton_formulario");

const tabla = document.getElementById("tabla")

const alumnos_impresos = document.getElementById("alumnos_impresos");


boton_formulario.onclick = function(){
    
    let input_nombre = document.getElementById("input_nombre").value
    let input_apellido = document.getElementById("input_apellido").value
    let input_id = document.getElementById("input_id").value

    numeroId = parseFloat(input_id);

    alumno.push(new alumnos_lista(numeroId, input_nombre, input_apellido));


    // validar datos:
    let longitud_session = sessionStorage.length;
    if(longitud_session == 0){
        pase = true;
    } else for(i = 0; i < longitud_session; i++){
        
        let buscador = JSON.parse( sessionStorage.getItem("alumno-"+i) );
        let encontrar = buscador.id;
       

        if(encontrar == numeroId){
            // alert("ID repetido.\nCorrige o elimina")

            // Libreria JS, SweetAlert.

             
            Swal.fire({
                icon: 'warning',
                title: 'ID ya registrado',
                text: 'Elimine o Modifique',
                
            })


            pase = false
            break
        }else{
            pase = true
        }
    }
    

    if(pase == true){

    // obtener la longitud del array
    let long = alumno.length;
    let leer_ultimo_agregado = long-1

  
    // Borrar:
    document.getElementById("input_nombre").value = "";
    document.getElementById("input_apellido").value = "";
    document.getElementById("input_id").value = "";

    // meter htmnl:

    let tr = document.createElement("tr");
    
    tr.setAttribute("id", alumno[leer_ultimo_agregado].id+"-id")

    alumnos_impresos.appendChild( tr )

    tr.innerHTML = `
        <td>  ${alumno[leer_ultimo_agregado].id}  </td>
        <td>  ${alumno[leer_ultimo_agregado].nombre}  </td>
        <td>  ${alumno[leer_ultimo_agregado].apellido}  </td>
        
        <td>
        <button class="boton_lista" id="${alumno[leer_ultimo_agregado].id}">X</button>
        </td>
        ` ;

    let identificacion = alumno[leer_ultimo_agregado].id;

    let eliminar_alumno = document.getElementById(identificacion);
    
    let quitar_html_alumno = document.getElementById(identificacion+"-id")

    almacenamiento_local()

    eliminar_alumno.onclick = function(){         
        posicion = alumno.findIndex(x => x.id === identificacion)

        alumno.splice(posicion, 1)

        quitar_html_alumno.remove()

        // JSON
        almacenamiento_local()

        
    }
    }else{
        // elimiar ultimo alumno del Storage:
        // agrego y luego quito
        almacenamiento_local()
        let numero = sessionStorage.length-1;            
        sessionStorage.removeItem("alumno-"+numero);

        // elinar del array:
        alumno.pop();
    }

   

}

imprimir_datos() 
function imprimir_datos(){

    for (let i=0; i<alumno.length; i++){
    
        datos_alumno = alumno[i];
    
        agregar_alumno_tabla(datos_alumno, i);
    }


    function agregar_alumno_tabla(datos_alumno, i){

        datos_alumno

        let tr = document.createElement("tr");

        let identificacion = alumno[i].id;

        tr.setAttribute("id", identificacion+"-id")

        alumnos_impresos.appendChild( tr )


        tr.innerHTML = `
        <td>  ${alumno[i].id}  </td>
        <td>  ${alumno[i].nombre}  </td>
        <td>  ${alumno[i].apellido}  </td>
        
        <td>
        <button class="boton_lista" id="${alumno[i].id}">X</button>
        </td>
        ` ;

        let eliminar_alumno = document.getElementById(identificacion);

        let quitar_html_alumno = document.getElementById(identificacion+"-id")

        

        eliminar_alumno.onclick = function(){
        

            posicion = alumno.findIndex(x => x.id === identificacion)

            alumno.splice(posicion, 1)

            quitar_html_alumno.remove()
            almacenamiento_local()
        }
    
    }

}




// implementando settimeout

const boton_seccion3 = document.querySelector(".boton_seccion3")

let bloqueo = false;

boton_seccion3.onclick = function(){   
    
    if (bloqueo){
        
        console.log("Esperar hasta que termine la cuenta regresiva")
        return;

    } else{

        const cuenta_regresiva = document.querySelector(".cuenta_regresiva");

        for(let i = 3; i >= 0; i--){
            funcSegundero(i)
        }

        function funcSegundero(x){
            setTimeout(() => {
                const timeRegresivo= [3, 2, 1, 0];
                cuenta_regresiva.innerHTML =`<p class="font_regresiva">${timeRegresivo[x]}</p>`
            }, 1000*x);

            bloqueo = true;
        }

        setTimeout(() => {
            cuenta_regresiva.innerHTML =`<p> </p>`

            bloqueo = false
        }, 4000);

    }
}




































