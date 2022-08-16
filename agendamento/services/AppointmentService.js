const { default: mongoose } = require("mongoose");
const AppointmentFactory = require("../factories/AppointmentFactory");
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

    async GetAll(finished = false){

        try {
           let appos = await Appo.find({'finished':finished})
           let appointments = [];
           appos.forEach(appointment =>{
            if(appointment.date != undefined){
                appointments.push(AppointmentFactory.Build(appointment))
            }
           });

           return appointments;
        } catch (error) {
            console.error(error)
            return [];
        }
        
    }

    async GetById(id){
        try {

            return await Appo.findOne({'id':id});
         } catch (error) {
             console.error(error)
             return [];
         }
    }
}

module.exports = new AppointmentService();