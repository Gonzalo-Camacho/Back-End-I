import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();

const serviceManager = new ServiceManager(
    "./src/data/services.json"
);


router.get("/", async (req, res) => {
    try {
        const servicios = await serviceManager.getServices(req.query);

        res.status(200).json(servicios);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los servicios"
        });
    }
});


router.get("/:sid", async (req, res) => {
    try {
        const servicio = await serviceManager.getServiceById(
            req.params.sid
        );

        if (!servicio) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json(servicio);

    } catch (error) {
        res.status(500).json({
            error: "Error al buscar el servicio"
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const nuevoServicio = await serviceManager.addService(
            req.body
        );

        res.status(201).json(nuevoServicio);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


router.put("/:sid", async (req, res) => {
    try {
        const servicioActualizado =
            await serviceManager.updateService(
                req.params.sid,
                req.body
            );

        if (!servicioActualizado) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json(servicioActualizado);

    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el servicio"
        });
    }
});


router.delete("/:sid", async (req, res) => {
    try {
        const servicioEliminado =
            await serviceManager.deleteService(
                req.params.sid
            );

        if (!servicioEliminado) {
            return res.status(404).json({
                error: "Servicio no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Servicio eliminado correctamente",
            servicio: servicioEliminado
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el servicio"
        });
    }
});


export default router;