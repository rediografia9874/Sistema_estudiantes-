<?php
require_once 'conexion.php';

$conn = getConnection();

// Reviso si el usuario escribió algo en el buscador
$buscar = "";
if (isset($_GET['nombre'])) {
    $buscar = $_GET['nombre'];
}

if ($buscar != "") {

    // Si buscó un nombre, filtro los estudiantes por ese nombre
    $sql = "SELECT * FROM usuarios
            WHERE activo = 1 AND nombre LIKE ?
            ORDER BY apellido";

    $stmt = $conn->prepare($sql);

    $busqueda = "%" . $buscar . "%";
    $stmt->bind_param("s", $busqueda);
    $stmt->execute();

    $resultado = $stmt->get_result();

} else {

    // Si no escribió nada, muestro todos los estudiantes activos
    $sql = "SELECT * FROM usuarios
            WHERE activo = 1
            ORDER BY apellido";

    $resultado = $conn->query($sql);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Lista de estudiantes</title>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    >
</head>
<body>

<h2>Buscar estudiante</h2>

<form method="GET" action="primerpaso.php">

    <input
        type="text"
        name="nombre"
        placeholder="Ingrese nombre"
        value="<?= htmlspecialchars($buscar) ?>"
    >

    <button type="submit">Buscar</button>

    <a href="primerpaso.php">Mostrar todos</a>

</form>

<br>

<table border="1">

    <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
        </tr>
    </thead>

    <tbody>

    <?php while ($fila = $resultado->fetch_assoc()) { ?>

        <tr>
            <td>
                <?= htmlspecialchars($fila['nombre'] . ' ' . $fila['apellido']) ?>
            </td>

            <td>
                <?= htmlspecialchars($fila['email']) ?>
            </td>

            <td>
                <a href="editar.php?id=<?= $fila['id'] ?>">Editar</a>

                &nbsp;|&nbsp;

                <a href="eliminar.php?id=<?= $fila['id'] ?>"
                   onclick="return confirm('¿Eliminar a <?= htmlspecialchars($fila['nombre']) ?>?')">
                   Eliminar
                </a>
            </td>
        </tr>

    <?php } ?>

    </tbody>

</table>

<p>Total encontrados: <?= $resultado->num_rows ?></p>

<br>

<a href="formulario.php">Agregar nuevo estudiante</a>

</body>
</html>
