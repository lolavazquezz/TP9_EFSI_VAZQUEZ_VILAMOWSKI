class EventLocation {
    constructor(id = 0, id_location = 0, name = "", full_address = "", max_capacity = 0, latitude = 0, longitude = 0, id_creator_user = 0) {
        this.id = id;
        this.id_location = id_location;
        this.name = name;
        this.full_address = full_address;
        this.max_capacity = max_capacity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id_creator_user = id_creator_user;
    }
}

export default EventLocation;
