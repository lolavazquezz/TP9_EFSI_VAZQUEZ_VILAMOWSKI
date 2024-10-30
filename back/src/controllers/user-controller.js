import {Router} from "express";
import Service from '../services/user-service.js';
import authenticateToken from '../middlewares/auth-middleware.js'; // Asegúrate de importar el middleware
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'KvduPPiIG7NJ2Quhk5jGMy6z2YizmG';
const router = Router()
const svc = new Service();
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await svc.authenticateUser(username, password);
        if (user) {
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '365d' });
            res.status(200).json({ user, token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/register', async (req, res) => {
    let entity = req.body;
    const answer = await svc.createUser(entity);
    if (answer === "faltanCampos") {
        res.status(400).send("Faltan campos");
    } else {
        res.status(201).send({ message: 'Usuario creado satisfactoriamente', answer });
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await svc.getUserById(userId); 
        if (user) {
            res.status(200).json({ user }); 
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error("Error en /profile:", error); 
        res.status(500).json({ message: error.message });
    }
});
router.get('/usuarios', async (req, res) => { 
    try {
        const answer = await svc.getAllUsuarios();
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;