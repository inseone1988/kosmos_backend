# KOSMOS TEST APLICATION

Esta es la aplicacion de prueba

## Configuracion

1.- Clonar el repositorio

2.- Cambiar a kosmos_backend

```bash
cd kosmos_backend
```

3.- Instalar dependencias

```bash
npm install
```

4.- Editar la conexion de la base de datos en el archivo .env (El usuario debe tener permisos para operaciones CREATE, SELECT, UPDATE, DELETE) ademas de poder crear y eliminar procedimientos almacenados



5.- Correr el servidor
```bash
npm start
```

El servidor creara las tablas y el procedimiento almacenado de manera automatica.

Si todo se ejecuto de manera correcta ingresar a http://localhost:3000 se deberia abrir el formulario de inicio de session
 
