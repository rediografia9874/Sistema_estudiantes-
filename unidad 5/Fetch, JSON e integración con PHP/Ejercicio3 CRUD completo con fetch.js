const buscador = document.getElementById("buscador"); // Campo para filtrar por nombre o apellido.
const formularioBusqueda = document.getElementById("formularioBusqueda"); // Formulario del buscador.
const formulario = document.getElementById("formularioEstudiante"); // Formulario para agregar.
const tablaEstudiantes = document.getElementById("tablaEstudiantes"); // Cuerpo de la tabla.
const mensaje = document.getElementById("mensaje"); // Lugar para mostrar avisos.
const modalEdicion = document.getElementById("modalEdicion"); // Ventana para editar.
const formularioEdicion = document.getElementById("formularioEdicion"); // Formulario dentro del modal.

async function cargarEstudiantes() { // Pide al API la lista de estudiantes.
	const termino = encodeURIComponent(buscador.value.trim()); // Prepara el texto para la URL.

	try {
		const respuesta = await fetch(`api/estudiantes.php?q=${termino}`); // GET: busca estudiantes.
		const estudiantes = await respuesta.json(); // Convierte la respuesta JSON en datos JS.

		if (!respuesta.ok) {
			throw new Error(estudiantes.error); // Pasa los errores al bloque catch.
		}

		tablaEstudiantes.innerHTML = ""; // Vacía las filas viejas antes de dibujar las nuevas.

		estudiantes.forEach(function (estudiante) {
			mostrarEstudiante(estudiante); // Agrega una fila por cada estudiante.
		});

		mensaje.textContent = estudiantes.length === 0 ? "No se encontraron estudiantes." : ""; // Avisa si la búsqueda no tuvo resultados.
	} catch (error) {
		mensaje.textContent = "No se pudieron cargar los estudiantes."; // Avisa si falla la consulta.
	}
}

function mostrarEstudiante(estudiante) { // Construye una fila con los datos de un estudiante.
	const fila = tablaEstudiantes.insertRow(); // Crea una fila nueva en la tabla.
	fila.insertCell().textContent = estudiante.nombre; // Primera celda: nombre.
	fila.insertCell().textContent = estudiante.apellido;
	fila.insertCell().textContent = estudiante.email;

	const celdaAcciones = fila.insertCell(); // Celda para los botones.
	celdaAcciones.className = "acciones-tabla";

	const botonEditar = document.createElement("button"); // Crea el botón Editar.
	botonEditar.className = "boton-editar";
	botonEditar.textContent = "Editar";
	botonEditar.type = "button";
	botonEditar.addEventListener("click", function () {
		abrirEdicion(estudiante); // Abre el modal con este estudiante.
	});

	const botonEliminar = document.createElement("button"); // Crea el botón Eliminar.
	botonEliminar.className = "boton-eliminar";
	botonEliminar.textContent = "Eliminar";
	botonEliminar.type = "button";
	botonEliminar.addEventListener("click", function () {
		eliminarEstudiante(estudiante.id, fila); // Envía su ID para eliminarlo.
	});

	celdaAcciones.append(botonEditar, botonEliminar); // Coloca los dos botones en la fila.
}

function abrirEdicion(estudiante) { // Carga los datos actuales dentro del modal.
	document.getElementById("editId").value = estudiante.id; // Guarda el ID para el PUT.
	document.getElementById("editNombre").value = estudiante.nombre;
	document.getElementById("editApellido").value = estudiante.apellido;
	document.getElementById("editEmail").value = estudiante.email;
	modalEdicion.showModal(); // Muestra la ventana de edición.
}

async function eliminarEstudiante(id, fila) { // Pide confirmar y envía DELETE al API.
	if (!window.confirm("¿Seguro que quieres eliminar este estudiante?")) { // Si cancela, no hace nada.
		return;
	}

	try {
		const respuesta = await fetch("api/estudiantes.php", {
			method: "DELETE", // Indica que se quiere eliminar.
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: id }) // Envía el ID del estudiante.
		});
		const resultado = await respuesta.json(); // Lee el mensaje que devuelve PHP.

		if (!respuesta.ok) {
			throw new Error(resultado.error); // Informa si el API respondió con error.
		}

		fila.remove(); // Quita la fila de la tabla.
		mensaje.textContent = "Estudiante eliminado."; // Muestra el resultado.
	} catch (error) {
		mensaje.textContent = error.message || "No se pudo eliminar el estudiante."; // Muestra el error.
	}
}

formularioBusqueda.addEventListener("submit", function (evento) { // Se activa al buscar o presionar Enter.
	evento.preventDefault(); // Evita que el navegador recargue la página.
	cargarEstudiantes();
});

buscador.addEventListener("input", cargarEstudiantes); // Busca mientras se escribe.

formulario.addEventListener("submit", async function (evento) { // Se activa al agregar estudiante.
	evento.preventDefault(); // Evita la recarga tradicional del formulario.

	const estudiante = { // Guarda en un objeto los valores ingresados.
		nombre: document.getElementById("nombre").value.trim(),
		apellido: document.getElementById("apellido").value.trim(),
		email: document.getElementById("email").value.trim()
	};

	try {
		const respuesta = await fetch("api/estudiantes.php", {
			method: "POST", // Envía los datos nuevos al API.
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(estudiante) // Convierte el objeto a JSON.
		});
		const resultado = await respuesta.json();

		if (!respuesta.ok) {
			throw new Error(resultado.error); // Muestra errores como email repetido.
		}

		formulario.reset(); // Limpia los campos.
		buscador.value = "";
		await cargarEstudiantes(); // Actualiza la tabla sin recargar la página.
		mensaje.textContent = "Estudiante agregado.";
	} catch (error) {
		mensaje.textContent = error.message || "No se pudo agregar el estudiante.";
	}
});

formularioEdicion.addEventListener("submit", async function (evento) { // Se activa al guardar cambios.
	evento.preventDefault(); // Evita la recarga tradicional del formulario.

	const estudiante = { // Junta el ID y los nuevos datos.
		id: Number(document.getElementById("editId").value),
		nombre: document.getElementById("editNombre").value.trim(),
		apellido: document.getElementById("editApellido").value.trim(),
		email: document.getElementById("editEmail").value.trim()
	};

	try {
		const respuesta = await fetch("api/estudiantes.php", {
			method: "PUT", // Envía los cambios al API.
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(estudiante) // Convierte los cambios a JSON.
		});
		const resultado = await respuesta.json();

		if (!respuesta.ok) {
			throw new Error(resultado.error);
		}

		modalEdicion.close(); // Cierra la ventana.
		await cargarEstudiantes(); // Vuelve a cargar la tabla con los datos nuevos.
		mensaje.textContent = "Estudiante actualizado.";
	} catch (error) {
		mensaje.textContent = error.message || "No se pudo actualizar el estudiante.";
	}
});

document.getElementById("cancelarEdicion").addEventListener("click", function () { // Botón Cancelar.
	modalEdicion.close(); // Cierra el modal sin guardar.
});

cargarEstudiantes(); // Carga la lista cuando se abre la página.