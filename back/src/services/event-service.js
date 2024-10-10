import repository from '../repositories/event-repository.js';
export default class EventService {
    getAllEvents = async () => {
        const repo = new repository();
        console.log("entro");
        const returnArray = await repo.getAllEvents();
        return returnArray;
    }
    getEvent = async (name, category, date, tag) => {
        const repo = new repository();
        const returnArray = await repo.getEvent(name, category, date, tag);
        return returnArray;
    }
    getEventById = async (id) => {
        const repo = new repository();
        const returnArray = await repo.getEventById(id);
        return returnArray;
    }
    getParticipants = async (entity, id) => {
        const repo = new repository();
        const returnArray = await repo.getParticipants(entity, id);
        return returnArray;
    }
    createEvent = async (entity) => {
        const repo = new repository();
        const returnArray = await repo.createEvent(entity);
        return returnArray;
    }
    alterEvent = async (user, name, entity) => {
        const repo = new repository();
        const returnArray = await repo.alterEvent(user, name, entity);
        return returnArray;
    }
    deleteEvent = async (user, name) => {
        const repo = new repository();
        const returnArray = await repo.deleteEvent(user, name);
        return returnArray;
    }
    enrollUser = async (id, username, entity) => {
        const repo = new repository();
        const returnArray = await repo.enrollUser(id, username, entity);
        return returnArray;
    }
    removeUser = async (id, username) => {
        const repo = new repository();
        const returnArray = await repo.removeUser(id, username);
        return returnArray;
    }
    rateEvent = async (id, username, rating) => {
        const repo = new repository();
        const returnArray = await repo.rateEvent(id, username, rating);
        return returnArray;
    }
}
