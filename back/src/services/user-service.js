import repository from '../repositories/user-repository.js';
export default class UserService {
    logUser = async (entity) => {
    const repo = new repository();
    const returnArray = await repo.logUser(entity);
    return returnArray;
}
createUser = async (entity) => {
    const repo = new repository();
    const returnArray = await repo.createUser(entity);
    return returnArray;
}
}