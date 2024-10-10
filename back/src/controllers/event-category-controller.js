import {Router} from "express";
import Service from '../services/event-category-service.js';
const router = Router()
const svc = new Service();
router.get('', async (req, res)=> { 
    const returnArray = await svc.getAllCategories(); 
    res.status(200).send(returnArray); 
})
router.get('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getCategoryById(id); 
    if (returnArray) res.status(200).send(returnArray); 
    else if (returnArray == 404) res.status(404).send("El id de la categoría no existe"); 
})
router.post('', async (req, res)=> { 
    let entity = req.body;
    let {id, event_category_name, display_order} = entity;
    const message = await svc.createEventCategory(id, event_category_name, display_order);    
    if (message == "created") res.status(201).send("La categoría se creó satisfactoriamente"); 
    else if (message == "empty") res.status(400).send("Faltan campos"); 
    else if (message == "less") res.status(404).send("El nombre de la categoría debe ser mayor a 2 letras"); 
    else if (message == "error") res.status(401).send("Error"); 
})
router.put('', async (req, res)=> { 
    let user = req.query.user;
    let event_category_name = req.query.event_category_name;
    let id = parseInt(req.query.id);
    const returnArray = await svc.alterEventCategory(user, id, event_category_name);    
    if (returnArray == 200) res.status(200).send("La categoría se modificó satisfactoriamente");
    else if (returnArray == "notFound") res.status(404).send("Al usuario no le pertenece este evento");
    else if (returnArray == 404) res.status(404).send("El id de la categoría no existe");
    else if (returnArray == "less") res.status(400).send("El nombre de la categoría debe ser mayor a 2 letras");
})
router.delete('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const message = await svc.deleteEventCategory(id);    
    if (message == "removed") res.status(200).send("La categoría del evento fue eliminada satisfactoriamente"); 
    else if (message == 404) res.status(404).send("No existe un evento con esa categoria"); 
    else if (message == "error") res.status(401).send("Error");
})
export default router;