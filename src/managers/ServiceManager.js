import fs from "fs/promises";

export default class ServiceManager {
    constructor(path) {
        this.path = path;
    }

    async getServices(filtros = {}) {
        try {
            const data = await fs.readFile(this.path, "utf-8");

            let servicios = JSON.parse(data);

            if (filtros.category) {
                servicios = servicios.filter(
                    (servicio) =>
                        servicio.category === filtros.category
                );
            }

            if (filtros.available !== undefined) {
                servicios = servicios.filter(
                    (servicio) =>
                        servicio.available ===
                        (filtros.available === "true")
                );
            }

            return servicios;
        } catch (error) {
            console.error(
                "Error al leer los servicios:",
                error.message
            );

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

    async addService(serviceData) {
        const servicios = await this.getServices();

        const {
            name,
            description,
            duration,
            price,
            category,
            available
        } = serviceData;

        if (
            !name ||
            !description ||
            duration === undefined ||
            price === undefined ||
            !category ||
            available === undefined
        ) {
            throw new Error("Todos los campos son obligatorios.");
        }

        const nuevoId =
            servicios.length > 0
                ? Math.max(
                    ...servicios.map((servicio) => servicio.id)
                ) + 1
                : 1;

        const nuevoServicio = {
            id: nuevoId,
            name,
            description,
            duration,
            price,
            category,
            available
        };

        servicios.push(nuevoServicio);

        await fs.writeFile(
            this.path,
            JSON.stringify(servicios, null, 2)
        );

        return nuevoServicio;
    }

    async updateService(id, updatedData) {
        const servicios = await this.getServices();

        const indice = servicios.findIndex(
            (servicio) => servicio.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        const { id: ignoredId, ...datosSinId } = updatedData;

        servicios[indice] = {
            ...servicios[indice],
            ...datosSinId,
            id: servicios[indice].id
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
