import {Router} from "express";
import Service from '../services/event-service.js';
const router = Router()
const svc = new Service();
router.get('', async (req, res) => { 
    let name = req.query.event_name;
    let category = req.query.event_category_name;
    let date = req.query.date;
    let tag = req.query.tag_name;
    let returnArray;
    if (!name && !category && !date && !tag){
        returnArray = await svc.getAllEvents();
    }
    else{
        returnArray = await svc.getEvent(name, category, date, tag);
    }
    res.status(200).send(returnArray);   
})
router.get('/:id', async (req, res)=> { 
    let id = parseInt(req.params.id);
    const returnArray = await svc.getEventById(id);  
    res.status(200).send(returnArray);
})
router.get('/:id/enrollment', async (req, res)=> { 
    let id = parseInt(req.params.id);
    let entity = req.body;
    const returnArray = await svc.getParticipants(entity, id); 
    res.status(200).send(returnArray);
})
router.post('/create', async (req, res)=> { 
    let entity = req.body;
    const returnArray = await svc.createEvent(entity);    
    console.log("entroooo");
    if (returnArray == "created") res.status(201).send("Evento creado satisfactoriamente");
    else if (returnArray == "empty") res.status(400).send("Faltan campos");
    else if (returnArray == "error") res.status(401).send("Error");
})
router.put('/:user/:event_name', async (req, res)=> { 
    let user = req.params.user;
    let name = req.params.event_name;
    let entity = req.body;
    const returnArray = await svc.alterEvent(user, name, entity);    
    if (returnArray == "modified") res.status(200).send("Evento modificado satisfactoriamente");
    else res.status(401).send("Error");
})
router.delete('/:user/:event_name', async (req, res)=> { 
    let user = req.params.user;
    let name = req.params.event_name;
    const returnArray = await svc.deleteEvent(user, name);    
    if (returnArray == "deleted") res.status(200).send("Evento eliminado satisfactoriamente");
    else if (returnArray == "error") res.status(404).send("Error");
})
router.post('/:id/enrollment/:username', async (req, res)=> { 
    let id = parseInt(req.params.id);
    let username = req.params.username;
    let entity = req.body;
    const message = await svc.enrollUser(id, username, entity);    
    if (message == "enrolled") res.status(201).send("El usuario se inscribió satisfactoriamente"); 
    else if (message == "notFound") res.status(404).send("No existe un evento con ese ID"); 
    else if (message == "exceeded") res.status(400).send("El evento alcanzó el límite de inscriptos");
    else if (message == "error") res.status(401).send("Error"); 
})
router.delete('/:id/enrollment/:username', async (req, res)=> { 
    let id = parseInt(req.params.id);
    let username = req.params.username;
    const message = await svc.removeUser(id, username);    
    if (message == "removed") res.status(200).send("El usuario canceló la suscripción satisfactoriamente"); 
    else if (message == "notFound") res.status(404).send("No existe un evento con ese ID"); 
    else if (message == "notRegistered") res.status(404).send("El usuario no está registrado en este evento"); 
    else if (message == "pastEvent") res.status(400).send("El evento ya comenzó o finalizó"); 
})
router.patch('/:id/enrollment/:rating/:username', async (req, res)=> { 
    let id = parseInt(req.params.id);
    let rating = parseInt(req.params.rating);
    let username = req.params.username;
    const message = await svc.rateEvent(id, username, rating);    
    if (message == "rated") res.status(200).send("El evento se calificó satisfactoriamente"); 
    else if (message == "notFound") res.status(404).send("No existe un evento con ese ID"); 
    else if (message == "notRegistered") res.status(400).send("El usuario no está registrado en este evento"); 
    else if (message == "ongoingEvent") res.status(400).send("El evento no finalizó aún"); 
    else if (message == "notInRange") res.status(400).send("El valor no se encuentra entre 1 y 10"); 
})
export default router;