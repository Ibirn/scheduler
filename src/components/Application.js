import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview } from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
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
          console.log("INTSUCC? ", interview)

          return (
            <Appointment
              key={appointment.id}
              interviewer={interview}
              {...appointment}
            />)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
