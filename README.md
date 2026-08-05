# Sistema de Reservas - Administrador de Servicios

## Descripción

Proyecto desarrollado con Node.js utilizando módulos ES (ESM).

El objetivo es implementar un administrador de servicios para un sistema de turnos y reservas, permitiendo gestionar información almacenada en un archivo JSON mediante la clase `ServiceManager`.

La aplicación permite consultar, agregar, actualizar y eliminar servicios.

## Tecnologías utilizadas

* Node.js
* JavaScript ES Modules (ESM)
* dotenv
* File System (`fs/promises`)

## Instalación

Clonar el repositorio e instalar las dependencias necesarias:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza variables de entorno mediante `dotenv`.

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
```

También se incluye el archivo `.env.example` como referencia para la configuración necesaria.

## Estructura del proyecto

```
sistemareservas/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── managers/
│   │   └── ServiceManager.js
│   │
│   ├── data/
│   │   └── services.json
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ServiceManager

La clase `ServiceManager` se encarga de administrar los servicios almacenados en `services.json`.

Cada servicio contiene la siguiente información:

* id
* nombre
* descripción
* duración
* precio
* categoría
* disponibilidad

## Métodos implementados

### `getServices()`

Obtiene todos los servicios almacenados en el archivo JSON.

### `getServiceById(id)`

Busca un servicio mediante su identificador.

Retorna el servicio encontrado o `null` si no existe.

### `addService(datosServicio)`

Agrega un nuevo servicio al archivo JSON.

Realiza validaciones para verificar que todos los campos requeridos estén completos.

### `updateService(id, datosActualizados)`

Actualiza la información de un servicio existente.

### `deleteService(id)`

Elimina un servicio mediante su identificador.

## Ejecución

Para iniciar el proyecto:

```bash
npm start
```

También puede ejecutarse utilizando:

```bash
npm run dev
```

## Configuración

Al iniciar la aplicación se validan las variables de entorno requeridas:

* `PORT`
* `NODE_ENV`

Si alguna variable no está configurada, la aplicación finaliza mostrando un mensaje de error.
