import UsuarioRepository from '../repositories/user-repository.js'
export default class UserService {
    authenticateUser = async (username, password) => {
        const repo = new UsuarioRepository();
        const user = await repo.authenticateUser(username, password);
        return user;
    }
    createUser = async (entity) => {;
        const repo = new UsuarioRepository()
        const user = await repo.createUser(entity);
        return user;
    }
    getUserById = async (userId) => {
        const repo = new UsuarioRepository();
        const user = await repo.getUserById(userId);
        return user;
    } 
    getAllUsuarios = async () => {
        const repo = new UsuarioRepository();
        const answer = await repo.getAllUsuarios();
        return answer;
    }
}