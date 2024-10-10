import {Router} from "express";
import Service from '../services/location-service.js';
const router = Router()
const svc = new Service();
router.get('', async (req, res)=> { 
    const returnArray = await svc.getAllLocations(); 
    res.status(200).send(returnArray); 
})
router.get('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getLocationById(id); 
    if (returnArray) res.status(200).send(returnArray); 
    else if (returnArray == 404) res.status(404).send("El id de la localidad no existe"); 
})
router.get('/province/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getLocationByProvinceId(id); 
    if (returnArray) res.status(200).send(returnArray); 
    else if (returnArray == 404) res.status(404).send("El id de la provincia no existe"); 
})
export default router;