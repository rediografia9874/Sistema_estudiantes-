const botonRecargar = document.getElementById("recargar");
const estado = document.getElementById("estado");
const tablaUsuarios = document.getElementById("tablaUsuarios");
const formularioUsuario = document.getElementById("formularioUsuario");

let usuariosApi = [];
const usuariosManuales = [];

// Función para mostrar los usuarios en la tabla
function mostrarUsuarios(usuarios) {
	tablaUsuarios.innerHTML = "";

	usuarios.forEach(function (usuario) {
		const nuevaFila = tablaUsuarios.insertRow();
		nuevaFila.insertCell().textContent = usuario.name;
		nuevaFila.insertCell().textContent = usuario.email;
		nuevaFila.insertCell().textContent = usuario.address.city;
	});
}

async function cargarUsuarios() {
	botonRecargar.disabled = true;
	estado.textContent = "Cargando...";

	try {
		const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");// Realiza la solicitud a la API para obtener los usuarios

		if (!respuesta.ok) {
			throw new Error("No se pudo cargar la lista.");
		}

		usuariosApi = await respuesta.json();// gaurdar los usuarios obtenidos de la API en la variable usuariosApi

		mostrarUsuarios(usuariosApi.concat(usuariosManuales));

		estado.textContent = "";
	} catch (error) {
		estado.textContent = "No se pudieron cargar los usuarios.";
	} finally {
		botonRecargar.disabled = false;
	}
}

formularioUsuario.addEventListener("submit", function (evento) {
	evento.preventDefault();

	const usuario = {
		name: document.getElementById("nombre").value.trim(),
		email: document.getElementById("email").value.trim(),
		address: {
			city: document.getElementById("ciudad").value.trim()
		}
	};

	usuariosManuales.push(usuario);
	mostrarUsuarios(usuariosApi.concat(usuariosManuales));
	formularioUsuario.reset();
	estado.textContent = "Usuario agregado a la lista.";
});

botonRecargar.addEventListener("click", cargarUsuarios);

cargarUsuarios();
