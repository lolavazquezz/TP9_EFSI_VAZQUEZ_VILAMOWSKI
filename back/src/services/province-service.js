import repository from '../repositories/province-repository.js';
export default class ProvinceService {
    getAllProvinces = async () => {
    const repo = new repository();
    const returnArray = await repo.getAllProvinces();
    return returnArray;
 }
 getProvinceById = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getProvinceById(id);
    return returnArray;
 }
 createProvince = async (entity) => {
    const repo = new repository();
    const returnArray = await repo.createProvince(entity);
    return returnArray;
 }
 alterProvince = async (entity) => {
    const repo = new repository();
    const returnArray = await repo.alterProvince(entity);
    return returnArray;
 }
 deleteProvince = async (id) => {
     const repo = new repository();
     const returnArray = await repo.deleteProvince(id);
     return returnArray;
 }
}