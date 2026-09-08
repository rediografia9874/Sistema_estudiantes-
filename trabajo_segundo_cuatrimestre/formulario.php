<!DOCTYPE html>
<html>
<head>
    <title>Agregar estudiante</title>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    >
</head>
<body>

<h2>Nuevo estudiante</h2>

<form action="insertar.php" method="POST">

    <label>Nombre:</label>
    <input type="text" name="nombre" required>
    <br><br>

    <label>Apellido:</label>
    <input type="text" name="apellido" required>
    <br><br>

    <label>Email:</label>
    <input type="email" name="email" required>
    <br><br>

    <button type="submit">Guardar</button>

</form>

<br>

<a href="primerpaso.php">Volver al listado</a>

</body>
</html>
