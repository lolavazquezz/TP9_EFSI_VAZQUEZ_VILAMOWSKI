import repository from '../repositories/event-location-repository.js';
export default class EventLocationService {
    getAllEventLocations = async () => {
    const repo = new repository();
    const returnArray = await repo.getAllEventLocations();
    return returnArray;
}
getEventLocationById = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getEventLocationById(id);
    return returnArray;
}
getLocationFromEventLocationById = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getLocationFromEventLocationById(id);
    return returnArray;
}
}