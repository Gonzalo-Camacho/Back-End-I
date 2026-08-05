import fs from "fs/promises";

export default class ServiceManager {
    constructor(path) {
        this.path = path;
    }

    async getServices() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo:", error.message);
            return [];
        }
    }

    async getServiceById(id) {
        const servicios = await this.getServices();

        const servicio = servicios.find(
            (servicio) => servicio.id === Number(id)
        );

        return servicio || null;
    }

    async addService(datosServicio) {
        const servicios = await this.getServices();

        const {
            nombre,
            descripcion,
            duracion,
            precio,
            categoria,
            disponible
        } = datosServicio;

        if (
            !nombre ||
            !descripcion ||
            duracion === undefined ||
            precio === undefined ||
            !categoria ||
            disponible === undefined
        ) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const nuevoId =
            servicios.length > 0
                ? servicios[servicios.length - 1].id + 1
                : 1;

        const nuevoServicio = {
            id: nuevoId,
            nombre,
            descripcion,
            duracion,
            precio,
            categoria,
            disponible
        };

        servicios.push(nuevoServicio);

        await fs.writeFile(
            this.path,
            JSON.stringify(servicios, null, 2)
        );

        return nuevoServicio;
    }

    async updateService(id, datosActualizados) {
        const servicios = await this.getServices();

        const indice = servicios.findIndex(
            (servicio) => servicio.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        delete datosActualizados.id;

        servicios[indice] = {
            ...servicios[indice],
            ...datosActualizados
        };

        await fs.writeFile(
            this.path,
            JSON.stringify(servicios, null, 2)
        );

        return servicios[indice];
    }

    async deleteService(id) {
        const servicios = await this.getServices();

        const indice = servicios.findIndex(
            (servicio) => servicio.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        const servicioEliminado = servicios.splice(indice, 1);

        await fs.writeFile(
            this.path,
            JSON.stringify(servicios, null, 2)
        );

        return servicioEliminado[0];
    }
}
