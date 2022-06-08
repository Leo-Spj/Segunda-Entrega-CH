
class alumnos_lista {

    constructor (id, nombre, apellido ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
const alumno = [ ];

// alumnos de ejemplo dentro del array
alumno.push(new alumnos_lista (10234454, "leo", "lala"));
alumno.push(new alumnos_lista (1113423, "vale", "lulu"));




const input_nombre = document.querySelector(".input_nombre");
const input_apellido = document.querySelector(".input_apellido");
const input_id = document.querySelector(".input_id");

const boton_formulario = document.querySelector(".boton_formulario");

const tabla = document.querySelector(".tabla")


/**
input_nombre.oninput = function(){
console.log(input_nombre.value)
}
input_apellido.oninput = function(){
console.log(input_apellido.value)
}
input_id.oninput = function(){
console.log(input_id.value)
}
*/


boton_formulario.onclick = function(){
    

    let escuchar_nombre = document.getElementById("input_nombre").value
    let input_apellido = document.getElementById("input_apellido").value
    let input_id = document.getElementById("input_id").value


    console.log(escuchar_nombre)
    console.log(input_apellido)
    console.log(input_id)



}


// Para escuchar los nuevos ingresos de usuarios se podria hacer escuchar al boton de Registrar y con eso actualizar el ciclo For de aqui abajo

for (let i=0; i<alumno.length; i++){

    datos_alumno = alumno[i];

    agregar_alumno_tabla(datos_alumno, i);


    
}

function agregar_alumno_tabla(datos_alumno, i){
    
    datos_alumno

    let tr = document.createElement("tr");
    
    let identificacion = alumno[i].id;

    tr.setAttribute("id", identificacion+"-id")

    tabla.appendChild( tr )

    
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
    }
    
   
}









































