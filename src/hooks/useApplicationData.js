import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  console.log("USEAPPSTATE: ", state)
  const setDay = day => setState({ ...state, day });

  //Adds interview to database with axios
  function bookInterview(id, interview) {
    const appointment = { //captures and copies save function's interview object
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });
      return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days })
      })
  }

  //Deletes interview in database with axios
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days })
    })
  }

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

  return { state, setDay, bookInterview, cancelInterview };
}
