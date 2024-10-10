import {Router} from "express";
import Service from '../services/province-service.js';
const router = Router()
const svc = new Service();
router.get('', async (req, res)=> { 
    const returnArray = await svc.getAllProvinces();
    res.status(200).send(returnArray); 
})
router.get('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getProvinceById(id); 
    if (!returnArray) res.status(400).send("No existe una provincia con ese ID.");
    else res.status(200).send(returnArray); 
})
router.post('', async (req, res)=> { 
    let entity = req.body;
    const message = await svc.createProvince(entity);    
    if (message == "created") res.status(201).send("La provincia se creó correctamente"); 
    else if (message == "empty") res.status(400).send("El nombre de la provincia está vacío"); 
    else if (message == "less") res.status(400).send("El nombre de la provincia debe ser mayor a dos letras"); 
    else if (message == "error") res.status(404).send("Error"); 

})
router.put('', async (req, res)=> { 
    let entity = req.body;
    const message = await svc.alterProvince(entity);    
    if (message == "modified") res.status(201).send("La provincia se modificó correctamente"); 
    else if (message == "notFound") res.status(404).send("El ID de la provincia no existe"); 
    else if (message == "empty") res.status(400).send("El nombre de la provincia está vacío"); 
    else if (message == "less") res.status(400).send("El nombre de la provincia debe ser mayor a dos letras"); 
    else if (message == "error") res.status(404).send("Error"); 
})
router.delete('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const code = await svc.deleteProvince(id);    
    if (code == 200) res.status(200).send("La provincia se eliminó correctamente"); 
    else if (code == 404) res.status(404).send("La provincia se eliminó correctamente"); 
})
export default router;