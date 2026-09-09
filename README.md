# Sistema de Gestión de Estudiantes

Un sistema web ABM / CRUD (Altas, Bajas, Modificaciones y Consultas) desarrollado en PHP nativo y MySQL para gestionar un registro de estudiantes.

## 🚀 Características

* **Listado y Búsqueda:** Búsqueda en tiempo real de estudiantes por nombre con filtrado dinámico (`LIKE %nombre%`) y ordenamiento por apellido.
* **Alta de estudiantes:** Formulario de registro con validaciones de servidor (`FILTER_VALIDATE_EMAIL`).
* **Modificación de datos:** Formulario de edición con precarga de información del estudiante.
* **Baja Lógica (*Soft Delete*):** Desactivación segura de registros (`activo = 0`) para preservar el historial en la base de datos sin borrar filas físicamente.
* **Seguridad:**
  * Consultas preparadas (*Prepared Statements*) con MySQLi para prevenir inyecciones SQL.
  * Escapado de HTML (`htmlspecialchars`) en todas las vistas para evitar vulnerabilidades XSS.
  * Control de errores de conexión seguros en el servidor.
* **Interfaz de usuario:** Diseño limpio y responsivo integrado con [Pico CSS v2](https://picocss.com/).

## 🛠️ Tecnologías utilizadas

* **Lenguaje:** PHP 8.x
* **Base de Datos:** MySQL / MariaDB (Driver MySQLi)
* **Frontend / CSS:** Pico CSS v2 (vía CDN)

## 📋 Requisitos previos

* Servidor web local (XAMPP, WAMP, MAMP, Laragon o el servidor integrado de PHP).
* Servidor MySQL / MariaDB activo en el puerto `3307` (o el puerto configurado en tu servidor local).

## 🗄️ Estructura de la Base de Datos

Crea la base de datos `sistema_estudiantes` y ejecuta la siguiente sentencia SQL para crear la tabla `usuarios`:

```sql
CREATE DATABASE IF NOT EXISTS sistema_estudiantes;
USE sistema_estudiantes;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    activo TINYINT(1) DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);