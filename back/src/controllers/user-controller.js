import {Router} from "express";
import Service from '../services/user-service.js';
const router = Router()
const svc = new Service();
router.get('/login', async (req, res)=> { 
    let entity = req.body;
    const message = await svc.logUser(entity);    
    res.status(200).send(message);
})
router.post('/register', async (req, res)=> { 
    let entity = req.body;
    const message = await svc.createUser(entity);    
    res.status(200).send(message);
})
export default router;