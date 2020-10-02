import React from 'react';
import "components/Appointment/styles.scss"
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode"
import Form from './Form';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  console.log("APPPROPS: ", props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header
        time={props.time}
        />
        { mode === SHOW &&
        (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />) }
        { mode ===EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        { mode === CREATE && <Form interviewers={props.interviewer} onCancel={back}/>} 
    </article>
  )
}
