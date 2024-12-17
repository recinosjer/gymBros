# GymBros

GymBros es una aplicación web diseñada para facilitar la gestión de usuarios y entrenamientos en un entorno de gimnasio.

## Características principales

### Backend

- **Gestión de usuarios**:
  - Registro de nuevos usuarios.
  - Inicio de sesión.

- **Gestión de entrenamientos**:
  - Creación de rutinas de entrenamiento personalizadas.
  - Listado de todas las rutinas disponibles.
  - Búsqueda de rutinas por  nombre.
  - Eliminación de rutinas

### Frontend

- Formularios de autenticación para registro e inicio de sesión de usuarios.
- Interfaz para la creación y edición de rutinas de entrenamiento.
- Visualización de rutinas existentes.
- Funcionalidad para cerrar sesión.

El frontend se desarrolló utilizando **TypeScript**, HTML, CSS y estilos proporcionados por Bootstrap.

## Estructura del proyecto

### Backend

La estructura del backend es la siguiente:

- **`controllers/`**:
  - `AuthController.ts`: Maneja las operaciones relacionadas con la autenticación y gestión de usuarios.
  - `WorkoutController.ts`: Gestiona las operaciones relacionadas con las rutinas de entrenamiento.

- **`middleware/`**:
  - `authMiddleware.ts`: Verifica la validez del token de autenticación del usuario.

- **`models/`**:
  - `User.ts`: Define el esquema y modelo de datos para los usuarios.
  - `Workout.ts`: Define el esquema y modelo de datos para las rutinas de entrenamiento.

- **`routes/`**:
  - `authRoutes.ts`: Define las rutas relacionadas con la autenticación y gestión de usuarios.
  - `workoutRoutes.ts`: Define las rutas relacionadas con las rutinas de entrenamiento.

- **`server.ts`**:
  - Archivo principal del servidor que configura el middleware y las rutas.

### Frontend

El frontend sigue la estructura estándar de una aplicación web con **TypeScript**:

- **`index.html`**:
  - Archivo principal que contiene la estructura básica de la aplicación.
  
- **`css/`**:
  - Carpeta que contiene los estilos personalizados además de los estilos de Bootstrap.

- **`ts/`**:
  - Carpeta que contiene los scripts de funcionalidad de la aplicación en TypeScript:
    - Manejo de formularios de autenticación.
    - Lógica para la creación y edición de rutinas.

- **`dist/`**:
  - Carpeta donde se compilan los archivos TypeScript a JavaScript para que sean ejecutados en el navegador.

## Tecnologías utilizadas

### Backend

- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Express**: Framework para la creación de servidores web en Node.js.
- **Mongoose**: Biblioteca para modelado de datos en MongoDB.
- **JWT (jsonwebtoken)**: Implementación de autenticación basada en tokens.
- **bcrypt**: Utilizado para el hash de contraseñas.
- **dotenv**: Manejo de variables de entorno.
- **cors**: Habilitación de CORS en el servidor.
- **body-parser**: Procesamiento de cuerpos de solicitudes HTTP.

### Frontend

- **TypeScript**: Lenguaje de programación con tipado estático para el desarrollo del frontend.
- **HTML, CSS**: Base para la construcción de la interfaz de usuario.
- **Bootstrap**: Framework CSS para el diseño responsivo y estilizado de la interfaz de usuario.
