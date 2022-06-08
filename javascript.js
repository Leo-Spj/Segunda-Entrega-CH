
class alumnos_lista {

    constructor (id, nombre, apellido ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
const alumno = [ ];

// alumnos de ejemplo dentro del array





const input_nombre = document.querySelector(".input_nombre");
const input_apellido = document.querySelector(".input_apellido");
const input_id = document.querySelector(".input_id");

const boton_formulario = document.querySelector(".boton_formulario");

const tabla = document.getElementById("tabla")

const alumnos_impresos = document.getElementById("alumnos_impresos");





boton_formulario.onclick = function(){
    
    let escuchar_nombre = document.getElementById("input_nombre").value
    let input_apellido = document.getElementById("input_apellido").value
    let input_id = document.getElementById("input_id").value

    numeroId = parseFloat(input_id);

    alumno.push(new alumnos_lista(numeroId, escuchar_nombre, input_apellido));


    // Borrar:
    document.getElementById("input_nombre").value = "";
    document.getElementById("input_apellido").value = "";
    document.getElementById("input_id").value = "";

    // meter htmnl:

    let tr = document.createElement("tr");
    
    // obtener la longitud del array
    let long = alumno.length;
    let leer_ultimo_agregado = long-1


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
    
        eliminar_alumno.onclick = function(){
            
    
            posicion = alumno.findIndex(x => x.id === identificacion)
    
            alumno.splice(posicion, 1)
    
            quitar_html_alumno.remove()
        }


}
