import { env } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const manager = new ServiceManager(
    "./src/data/services.json"
);

console.log("Proyecto iniciado correctamente");
console.log("Puerto:", env.PORT);
console.log("Entorno:", env.NODE_ENV);
