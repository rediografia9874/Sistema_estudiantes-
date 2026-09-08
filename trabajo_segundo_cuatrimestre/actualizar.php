<?php
require_once 'conexion.php';

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == "POST") {

    $id = 0;
    if (isset($_POST['id'])) {
        $id = (int) $_POST['id'];
    }

    $nombre = "";
    if (isset($_POST['nombre'])) {
        $nombre = trim($_POST['nombre']);
    }

    $apellido = "";
    if (isset($_POST['apellido'])) {
        $apellido = trim($_POST['apellido']);
    }

    $email = "";
    if (isset($_POST['email'])) {
        $email = trim($_POST['email']);
    }

    // Reviso que los datos estén completos y que el email sea válido
    if ($nombre == "" || $apellido == "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {

        echo "Datos inválidos.";

    } else {

        $conn = getConnection();

        $sql = "UPDATE usuarios SET nombre = ?, apellido = ?, email = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Error en la consulta: " . $conn->error);
        }

        $stmt->bind_param("sssi", $nombre, $apellido, $email, $id);

        if ($stmt->execute()) {

            header("Location: primerpaso.php?mensaje=actualizado");
            exit;

        } else {

            echo "Error al actualizar los datos: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }

} else {

    echo "No se recibió ningún formulario.";
}
?>
