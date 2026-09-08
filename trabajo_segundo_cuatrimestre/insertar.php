<?php
require_once 'conexion.php';

// Esta página solo debe funcionar si me llega un formulario por POST
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == "POST") {

    // Recibo los datos que mandó el formulario
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

    // Reviso que los datos estén completos y que el email tenga formato válido
    if ($nombre == "" || $apellido == "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {

        echo "Datos inválidos.";

    } else {

        $conn = getConnection();

        // Uso una consulta preparada para guardar los datos de forma segura
        $sql = "INSERT INTO usuarios (nombre, apellido, email) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Error en la consulta: " . $conn->error);
        }

        $stmt->bind_param("sss", $nombre, $apellido, $email);

        if ($stmt->execute()) {

            // Si se guardó bien, vuelvo al listado
            header("Location: primerpaso.php");
            exit;

        } else {

            echo "Error al guardar los datos: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }

} else {

    echo "No se recibió ningún formulario.";
}
?>
