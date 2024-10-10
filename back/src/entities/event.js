class Event {
    constructor(id = 0, name = "", description = "", date = "", duration = "", price = 0, available = false, capacity = 0, user = {}, category = {}, location = {}) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.date = date;
      this.duration = duration;
      this.price = price;
      this.available = available;
      this.capacity = capacity;
      this.user = user; 
      this.category = category; 
      this.location = location; 
    }
  }
  
export default Event;
