import React, { useState } from 'react'
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {
  console.log("IL: ",props)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(person => 
          <InterviewerListItem 
            key={person.id}
            avatar={person.avatar}
            name={person.name}
            setInterviewer={() => props.setInterviewer(person.id)}
            selected={props.interviewer === person.id}
          />
        )}
      </ul>
    </section>
  )
};