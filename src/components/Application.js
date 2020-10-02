import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const baseURL = "http://localhost:8001"
    const promOne = axios.get(`${baseURL}/api/days`)
    const promTwo = axios.get(`${baseURL}/api/appointments`)
    const promThree = axios.get(`${baseURL}/api/interviewers`)
    Promise.all([promOne, promTwo, promThree])
      .then(resArr => {
        setState(prev => ({ ...prev, days: resArr[0].data, appointments: resArr[1].data, interviewers: resArr[2].data }))
      }
      )
  }, [])

  function bookInterview(id, interview) {
    const appointment = { //captures and copies save function's interview object
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments}) //sets state as was but with new appointments data
    return axios.put(`/api/appointments/${id}`, appointment)
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState({...state, appointments})
    return axios.delete(`/api/appointments/${id}`, appointment)
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          console.log('INTERV: ', interview)
          console.log("APPLICSTATE: ", state)
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              interviewer={dailyInterviewers}
              interview={interview}
              time={appointment.time}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
