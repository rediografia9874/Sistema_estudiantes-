function calcularPromedio(notas) {
	const suma = notas.reduce((total, nota) => total + nota, 0);
	return suma / notas.length;
}


function estaAprobado(nota, minima = 6) {
	return nota >= minima;
}


function cargarEstudiantes(cantidad) {
	const estudiantes = [];

	for (let numero = 1; numero <= cantidad; numero += 1) {
		const nombre = prompt(`Nombre del estudiante ${numero}:`);
		const textoNotas = prompt('Notas separadas por comas:');
		const notas = textoNotas.split(',').map((nota) => Number(nota.trim()));

		estudiantes.push({ nombre, notas });
	}

	return estudiantes;
}

function main() {
	const cantidad = Number(prompt('¿Cuántos estudiantes desea cargar?'));

	if (!Number.isInteger(cantidad) || cantidad <= 0) {
		alert('Ingrese una cantidad entera mayor que cero.');
		return;
	}

	const estudiantes = cargarEstudiantes(cantidad);

	
	const promedios = estudiantes.map((estudiante) => ({
		nombre: estudiante.nombre,
		promedio: calcularPromedio(estudiante.notas)
	}));


	const aprobados = promedios.filter((estudiante) => estaAprobado(estudiante.promedio));

	console.log('Promedios de todos los estudiantes:', promedios);
	console.log('Estudiantes aprobados:', aprobados);

	const resultados = document.querySelector('#resultados');
	resultados.innerHTML = promedios.map((estudiante) => {
		const aprobado = estaAprobado(estudiante.promedio);
		const estado = aprobado ? 'Aprobado' : 'Desaprobado';
		const clase = aprobado ? 'aprobado' : 'desaprobado';

		return `
			<article class="estudiante ${clase}">
				<strong>${estudiante.nombre}</strong>
				<div class="promedio">${estudiante.promedio.toFixed(2)}</div>
				<div class="estado">${estado}</div>
			</article>
		`;
	}).join('');
}

main();
