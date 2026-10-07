const buscador = document.getElementById("buscador");// Elemento de entrada para buscar estudiantes
const formularioBusqueda = document.getElementById("formularioBusqueda");// Formulario para la búsqueda de estudiantes
const formulario = document.getElementById("formularioEstudiante");// Formulario para agregar un nuevo estudiante
const tablaEstudiantes = document.getElementById("tablaEstudiantes");// Tabla donde se mostrarán los estudiantes
const mensaje = document.getElementById("mensaje");// Elemento para mostrar mensajes

async function cargarEstudiantes() {// Función para cargar los estudiantes desde la API
	const termino = encodeURIComponent(buscador.value.trim());

	try {
		const respuesta = await fetch(`api/estudiantes.php?q=${termino}`);
		const estudiantes = await respuesta.json();

		if (!respuesta.ok) {
			throw new Error(estudiantes.error);
		}

		tablaEstudiantes.innerHTML = "";

		estudiantes.forEach(function (estudiante) {// Itera sobre cada estudiante y agrega una fila a la tabla
			const fila = tablaEstudiantes.insertRow();
			fila.insertCell().textContent = estudiante.nombre;
			fila.insertCell().textContent = estudiante.apellido;
			fila.insertCell().textContent = estudiante.email;
		});

		mensaje.textContent = estudiantes.length === 0 ? "No se encontraron estudiantes." : "";
	} catch (error) {
		mensaje.textContent = "No se pudieron cargar los estudiantes.";
	}
}

formularioBusqueda.addEventListener("submit", function (evento) {// Evento para manejar la búsqueda de estudiantes
	evento.preventDefault();
	cargarEstudiantes();
});

buscador.addEventListener("input", cargarEstudiantes);

formulario.addEventListener("submit", async function (evento) {
	evento.preventDefault();

	const estudiante = {
		nombre: document.getElementById("nombre").value.trim(),
		apellido: document.getElementById("apellido").value.trim(),
		email: document.getElementById("email").value.trim()
	};

	try {
		const respuesta = await fetch("api/estudiantes.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(estudiante)
		});
		const resultado = await respuesta.json();

		if (!respuesta.ok) {
			mensaje.textContent = resultado.error;
			return;
		}

		formulario.reset();
		buscador.value = "";
		await cargarEstudiantes();
		mensaje.textContent = "Estudiante agregado.";
	} catch (error) {
		mensaje.textContent = "No se pudo agregar el estudiante.";
	}
});

cargarEstudiantes();