<?php
// Datos para conectarme a la base de datos
$servidor   = "127.0.0.1";
$usuario_bd = "root";
$clave_bd   = "secreto";
$base_datos = "sistema_estudiantes";
$puerto     = 3307;

// Esta función abre la conexión y la devuelve para usarla en otras páginas
function getConnection() {
    global $servidor, $usuario_bd, $clave_bd, $base_datos, $puerto;

    // Intentar conectar, pero manejar errores para evitar un error 500 sin información
    mysqli_report(MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ERROR);
    try {
        $conn = new mysqli($servidor, $usuario_bd, $clave_bd, $base_datos, $puerto);
        $conn->set_charset("utf8mb4");
        return $conn;
    } catch (mysqli_sql_exception $e) {
        // Registrar detalle del error en el log de PHP (no exponer credenciales al usuario)
        error_log('DB connection error: ' . $e->getMessage());

        // Responder según el SAPI: en web mostrar mensaje amigable; en CLI mostrar detalle
        if (php_sapi_name() === 'cli') {
            fwrite(STDERR, "Error de conexión a la base de datos: " . $e->getMessage() . "\n");
            exit(1);
        } else {
            http_response_code(500);
            echo '<h1>Error</h1>';
            echo '<p>No se pudo conectar a la base de datos. Contacte al administrador.</p>';
            // Opcional: mostrar un enlace o instrucciones básicas
            exit;
        }
    }
}
?>
