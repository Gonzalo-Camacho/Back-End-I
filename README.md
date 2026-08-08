# Sistema de Reservas - API REST de Servicios

## Descripción

Proyecto desarrollado con Node.js utilizando módulos ES (ESM) y Express.

El objetivo es implementar una API REST para gestionar el recurso `services` de un sistema de turnos y reservas.

La aplicación permite consultar, filtrar, crear, actualizar y eliminar servicios almacenados en un archivo JSON mediante la clase `ServiceManager`.

La lógica de gestión de los servicios se encuentra en `ServiceManager`, mientras que las rutas HTTP se implementan mediante un router de Express.

## Tecnologías utilizadas

* Node.js
* Express
* JavaScript ES Modules (ESM)
* dotenv
* File System (`fs/promises`)

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza `dotenv` para cargar las variables de entorno.

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` es de uso local y no debe subirse al repositorio.

También se incluye el archivo `.env.example` como referencia:

```env
PORT=
NODE_ENV=
```

Al iniciar la aplicación se validan las variables de entorno requeridas. Si alguna no está configurada, la aplicación finaliza mostrando un mensaje de error.

## Estructura del proyecto

```text
sistemareservas/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   ├── routes/
│   │   └── services.router.js
│   │
│   ├── data/
│   │   └── services.json
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Recurso `services`

Cada servicio tiene la siguiente estructura:

```json
{
  "id": 1,
  "name": "Consulta médica",
  "description": "Atención general",
  "duration": 30,
  "price": 5000,
  "category": "salud",
  "available": true
}
```

Los campos utilizados son:

* `id`: identificador único del servicio.
* `name`: nombre del servicio.
* `description`: descripción del servicio.
* `duration`: duración del servicio.
* `price`: precio del servicio.
* `category`: categoría a la que pertenece.
* `available`: indica si el servicio está disponible.

## ServiceManager

La clase `ServiceManager` se encarga de administrar los servicios almacenados en `src/data/services.json`.

La lógica de acceso y modificación de los servicios permanece dentro de esta clase y no se encuentra directamente en `app.js`.

### `getServices()`

Obtiene todos los servicios almacenados.

También permite aplicar filtros mediante los siguientes parámetros:

* `category`
* `available`

Ejemplo:

```js
const servicios = await serviceManager.getServices();
```

Ejemplo con filtros:

```js
const servicios = await serviceManager.getServices({
  category: "salud",
  available: "true"
});
```

### `getServiceById(id)`

Busca un servicio mediante su identificador.

Devuelve el servicio encontrado o `null` si no existe.

Ejemplo:

```js
const servicio = await serviceManager.getServiceById(1);
```

### `addService(serviceData)`

Agrega un nuevo servicio.

El `id` se genera automáticamente dentro de `ServiceManager` y no debe enviarse desde el exterior.

Ejemplo:

```js
const nuevoServicio = await serviceManager.addService({
  name: "Masaje relajante",
  description: "Sesión de masaje de relajación",
  duration: 60,
  price: 10000,
  category: "bienestar",
  available: true
});
```

### `updateService(id, updatedData)`

Actualiza un servicio existente.

El `id` utilizado para identificar el servicio no puede ser modificado.

Ejemplo:

```js
const servicioActualizado =
  await serviceManager.updateService(1, {
    name: "Consulta médica general",
    description: "Atención médica general",
    duration: 40,
    price: 6000,
    category: "salud",
    available: true
  });
```

### `deleteService(id)`

Elimina un servicio mediante su identificador.

Ejemplo:

```js
const servicioEliminado =
  await serviceManager.deleteService(1);
```

## API REST

La API utiliza el prefijo:

```text
/api/services
```

### GET `/api/services`

Devuelve todos los servicios.

Ejemplo:

```text
GET http://localhost:8080/api/services
```

Respuesta exitosa:

```json
[
  {
    "id": 1,
    "name": "Consulta médica",
    "description": "Atención general",
    "duration": 30,
    "price": 5000,
    "category": "salud",
    "available": true
  }
]
```

### Filtrar por categoría

Se puede utilizar el query param `category`.

```text
GET http://localhost:8080/api/services?category=salud
```

Devuelve únicamente los servicios cuya categoría sea `salud`.

### Filtrar por disponibilidad

Se puede utilizar el query param `available`.

```text
GET http://localhost:8080/api/services?available=true
```

Devuelve únicamente los servicios disponibles.

También se puede consultar:

```text
GET http://localhost:8080/api/services?available=false
```

### GET `/api/services/:sid`

Devuelve un servicio mediante su `id`.

Ejemplo:

```text
GET http://localhost:8080/api/services/1
```

Si el servicio existe, devuelve:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

Ejemplo de respuesta cuando no existe:

```json
{
  "error": "Servicio no encontrado"
}
```

### POST `/api/services`

Crea un nuevo servicio.

Ejemplo:

```text
POST http://localhost:8080/api/services
```

Body:

```json
{
  "name": "Masaje relajante",
  "description": "Sesión de masaje de relajación",
  "duration": 60,
  "price": 10000,
  "category": "bienestar",
  "available": true
}
```

El `id` no debe enviarse en el body. Se genera automáticamente.

Si el servicio se crea correctamente, devuelve:

```text
201 Created
```

Si faltan campos obligatorios, devuelve:

```text
400 Bad Request
```

### PUT `/api/services/:sid`

Actualiza un servicio existente.

Ejemplo:

```text
PUT http://localhost:8080/api/services/1
```

Body:

```json
{
  "name": "Consulta médica general",
  "description": "Atención médica general",
  "duration": 40,
  "price": 6000,
  "category": "salud",
  "available": true
}
```

El `id` se obtiene mediante `req.params` y no puede modificarse desde el body.

Si el servicio existe:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

### DELETE `/api/services/:sid`

Elimina un servicio mediante su `id`.

Ejemplo:

```text
DELETE http://localhost:8080/api/services/1
```

Si el servicio existe, devuelve:

```text
200 OK
```

Si no existe:

```text
404 Not Found
```

## Códigos de estado utilizados

La API utiliza los siguientes códigos HTTP:

* `200 OK`: operación realizada correctamente.
* `201 Created`: servicio creado correctamente.
* `400 Bad Request`: datos faltantes o inválidos al crear un servicio.
* `404 Not Found`: servicio no encontrado.
* `500 Internal Server Error`: error interno durante el procesamiento de la solicitud.

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

También puede ejecutarse mediante:

```bash
npm run dev
```

Si la configuración es correcta, el servidor se iniciará utilizando el puerto definido en `.env`.

Por ejemplo:

```text
Servidor iniciado en el puerto 8080
```

## Pruebas de la API

Los endpoints pueden probarse utilizando herramientas como Postman, Thunder Client o cualquier cliente HTTP.

Ejemplos:

```text
GET    /api/services
GET    /api/services?category=salud
GET    /api/services?available=true
GET    /api/services/1
POST   /api/services
PUT    /api/services/1
DELETE /api/services/1
```

## Consideraciones

* No se debe subir el archivo `.env` al repositorio.
* No se debe subir `node_modules`.
* El `id` de un nuevo servicio se genera automáticamente.
* El `id` de un servicio existente no puede modificarse mediante `PUT`.
* La lógica de gestión de servicios se encuentra en `ServiceManager`.
* Las rutas HTTP se encuentran en `src/routes/services.router.js`.
