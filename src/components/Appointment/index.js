import React from 'react';
import "components/Appointment/styles.scss"
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode"
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING";
const CANCEL = "CANCEL";
const DELETE = "DELETE"
const EDIT = "EDIT"

export default function Appointment(props) {
  // console.log("APPPROPS: ", props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Captures name and interviewer from form and stores them as obj
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  //sends DELETE axios request and empties appointment
  function deleteAppointment() {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  //Calls Cancel confirmation screen
  function cancelConfirmation () {
    transition(CANCEL)
  }

  function editForm () {
    save
  }
  
  return (
    <article className="appointment">
      <Header
        time={props.time}
        />
        { mode === SHOW &&
        (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelConfirmation}
          onEdit={}
        />) }
        { mode === CANCEL && <Confirm
          message="Are you sure?"
          onConfirm={deleteAppointment}
          onCancel={back} /> }
        { mode === EDIT && <Form />}
        { mode === DELETE && <Status message="DELETING..." /> }
        { mode === SAVING && <Status message="SAVING ..." /> }
        { mode ===EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        { mode === CREATE && <Form interviewers={props.interviewer} onCancel={back} onSave={save}/>} 
    </article>
  )
}
