<?php
require_once 'conexion.php';

$conn = getConnection();

// Tomo el id del estudiante que quiero editar
$id = 0;
if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
}

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();
$estudiante = $resultado->fetch_assoc();

$stmt->close();
$conn->close();

// Si no existe ese estudiante, no sigo
if (!$estudiante) {
    die("Estudiante no encontrado.");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Editar estudiante</title>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    >
</head>
<body>

<h2>Editar estudiante</h2>

<form action="actualizar.php" method="POST">

    <input type="hidden" name="id" value="<?= $estudiante['id'] ?>">

    <label>Nombre:</label>
    <input type="text" name="nombre" value="<?= htmlspecialchars($estudiante['nombre']) ?>" required>
    <br><br>

    <label>Apellido:</label>
    <input type="text" name="apellido" value="<?= htmlspecialchars($estudiante['apellido']) ?>" required>
    <br><br>

    <label>Email:</label>
    <input type="email" name="email" value="<?= htmlspecialchars($estudiante['email']) ?>" required>
    <br><br>

    <button type="submit">Guardar cambios</button>

</form>

<br>

<a href="primerpaso.php">Volver al listado</a>

</body>
</html>
