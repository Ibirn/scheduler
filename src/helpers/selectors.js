export function getAppointmentsForDay (state, day) {
  const output = [];
  for (const elem of state.days) {
    if(elem.name === day){
      for (const appt of elem.appointments) {
        if(state.appointments[appt]){
          output.push(state.appointments[appt])
        }        
      }
    }
  }
  return output;
}