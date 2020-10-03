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

  const newSpots = {
    ...state.days[getDayIndex()],
    spots:(state.days[getDayIndex()].spots - 1)
  }
  const days = [...state.days]
  days.splice((getDayIndex()), 1, newSpots)

   //sets state as was but with new appointments data
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
    const newSpots = {
      ...state.days[getDayIndex()],
      spots:(state.days[getDayIndex()].spots + 1)
    }
    const days = [...state.days]
    days.splice((getDayIndex()), 1, newSpots)
    
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({...state, days})
    })
  }
  
  const getDayIndex = () => {
    let dayIndex;
    state.days.filter((day) => {
      if (day.name === state.day) {
        dayIndex = day.id;
      }
    })
    return dayIndex - 1
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
