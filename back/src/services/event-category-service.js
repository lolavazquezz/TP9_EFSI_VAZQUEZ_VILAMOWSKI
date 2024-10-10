import repository from '../repositories/event-category-repository.js';
export default class EventCategoryService {
    getAllCategories = async () => {
    const repo = new repository();
    const returnArray = await repo.getAllCategories();
    return returnArray;
}
getCategoryById = async (id) => {
    const repo = new repository();
    const returnArray = await repo.getCategoryById(id);
    return returnArray;
}
createEventCategory = async (id, category, display) => {
    const repo = new repository();
    const returnArray = await repo.createEventCategory(id, category, display);
    return returnArray;
}
alterEventCategory = async (user, id, event_category_name) => {
    const repo = new repository();
    const returnArray = await repo.alterEventCategory(user, id, event_category_name);
    return returnArray;
}
deleteEventCategory = async (id) => {
    const repo = new repository();
    const returnArray = await repo.deleteEventCategory(id);
    return returnArray;
}
}