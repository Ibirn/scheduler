import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };
  // console.log("PROPSINT: ", props.interviewers)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((person) => (
          <InterviewerListItem
            key={person.id}
            avatar={person.avatar}
            name={person.name}
            onChange={() => props.onChange(person.id)}
            selected={props.value === person.id}
          />
        ))}
      </ul>
    </section>
  );
}
