
class AppointmentFactory{
    Build(simpleAppointment){

        let day = simpleAppointment.date.getDate()+1;
        let month = simpleAppointment.date.getMonth();
        let year = simpleAppointment.date.getFullYear();
        let hour = Number.parseInt(simpleAppointment.time.split(":")[0]);
        let minutes = Number.parseInt(simpleAppointment.time.split(":")[1]);
        let startDate = new Date(year,month,day,hour,minutes,0,0);
        //startDate.setHours( startDate.getHours() - 3);// UTC -3

        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            url: '/event/'+simpleAppointment._id,
            start: startDate,
            end: startDate

        }

        return appo;
    }
}

module.exports = new AppointmentFactory();