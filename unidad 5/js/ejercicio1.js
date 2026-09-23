/*
Crear una página con un título, un párrafo y tres botones que:
Botón 1: cambie el texto del título.
Botón 2: cambie el color de fondo del párrafo alternando entre dos colores.
Botón 3: oculte o muestre el párrafo (toggle).
*/

const titulo = document.querySelector('#titulo');
const parrafo = document.querySelector('#parrafo');
const cambiarTitulo = document.querySelector('#cambiarTitulo');
const cambiarColor = document.querySelector('#cambiarColor');
const ocultarParrafo = document.querySelector('#ocultarParrafo');

cambiarTitulo.addEventListener('click', () => {
	titulo.textContent = 'Título modificado';
});

cambiarColor.addEventListener('click', () => {
	const colorActual = parrafo.style.backgroundColor;
	parrafo.style.backgroundColor = colorActual === 'lightblue' ? 'lightgreen' : 'lightblue';
});

ocultarParrafo.addEventListener('click', () => {
	parrafo.hidden = !parrafo.hidden;
});
