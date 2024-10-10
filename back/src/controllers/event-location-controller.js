import {Router} from "express";
import Service from '../services/event-location-service.js';
const router = Router()
const svc = new Service();
router.get('', async (req, res)=> { 
    const returnArray = await svc.getAllEventLocations(); 
    res.status(200).send(returnArray); 
})
router.get('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getEventLocationById(id); 
    if (returnArray) res.status(200).send(returnArray); 
    else if (returnArray == 404) res.status(404).send("El id de la ubicación del evento no existe"); 
})
router.get('/location/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getLocationFromEventLocationById(id); 
    if (returnArray) res.status(200).send(returnArray); 
    else if (returnArray == 404) res.status(404).send("El id de la localidad de la ubicación del evento no existe"); 
})
export default router;