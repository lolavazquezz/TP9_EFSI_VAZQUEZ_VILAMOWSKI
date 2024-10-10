import repository from '../repositories/location-repository.js';
export default class LocationService {
    getAllLocations = async () => {
    const repo = new repository();
    const returnArray = await repo.getAllLocations();
    return returnArray;
}
getLocationById = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getLocationById(id);
    return returnArray;
}
getLocationByProvinceId = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getLocationByProvinceId(id);
    return returnArray;
}
}