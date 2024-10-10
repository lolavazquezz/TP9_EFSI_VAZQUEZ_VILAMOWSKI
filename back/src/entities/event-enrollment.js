class EventEnrollment {
    constructor(id = 0, id_event = 0, id_user = 0, description = "", registration_date_time = "", attended = false, observations = "", rating = 0) {
        this.id = id;
        this.id_event = id_event;
        this.id_user = id_user;
        this.description = description;
        this.registration_date_time = registration_date_time;
        this.attended = attended;
        this.observations = observations;
        this.rating = rating;
    }
}

export default EventEnrollment;
