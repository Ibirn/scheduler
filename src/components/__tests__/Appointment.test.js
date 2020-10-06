import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

const propData = {
  "id": 1,
  "interviewers": [
    {"avatar": "https://i.imgur.com/LpaY82x.png", "id": 1, "name": "Sylvia Palmer"},
    {"avatar": "https://i.imgur.com/T2WwVfS.png", "id": 3, "name": "Mildred Nazir"},
    {"avatar": "https://i.imgur.com/twYrpay.jpg", "id": 5, "name": "Sven Jones"}
  ],
  "interview": {
    "student": "Alice Liddell",
    "interviewer": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  },
  "time": "12pm",
  "bookInterview": "ƒ bookInterview() {}",
  "cancelInterview": "ƒ cancelInterview() {}"
}

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});