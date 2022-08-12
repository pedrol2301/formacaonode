const { default: mongoose } = require("mongoose");
const appointment = require("../models/Appointment");

const Appo = mongoose.model("Appointment",appointment);

class AppointmentService {

    async Create(obj){
        const newAppo = new Appo({
            name:           obj.name,
            email:          obj.email,
            cpf:            obj.cpf,
            description:    obj.description,
            date:           obj.date,
            time:           obj.time,
            attendant:      obj.attendant,
            finished:       false
        });
        try {
            await newAppo.save()
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = new AppointmentService();