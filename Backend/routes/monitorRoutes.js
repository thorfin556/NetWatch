import express from "express";

import { 
    createMonitor,
    getMonitorUser,
    getMoniterById,
    updateMonitor,
    deletedMonitor,
    getMoniterHistory,
    getLatestMonitor,
    dashboard
} from "../controllers/monitorController.js";
import authMiddleware from "../middleware/auth.js";

const monitorRoutes = express.Router();

monitorRoutes.get('/dashboard',authMiddleware,dashboard);
monitorRoutes.post('/',authMiddleware,createMonitor);
monitorRoutes.get('/',authMiddleware,getMonitorUser);
monitorRoutes.get('/:id',authMiddleware,getMoniterById);
monitorRoutes.get('/:id/history',authMiddleware,getMoniterHistory);
monitorRoutes.get('/:id/latest',authMiddleware,getLatestMonitor);
monitorRoutes.put('/:id',authMiddleware,updateMonitor);
monitorRoutes.delete('/:id',authMiddleware,deletedMonitor);




export default monitorRoutes;