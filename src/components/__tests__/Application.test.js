import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByTestId,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books and interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); //async/await wait for render to look for first name
    const appointments = getAllByTestId(container, "appointment"); //grab list of appointments by finding all things with data-testid appointment
    const appointment = appointments[0]; //grab first appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Hamlord Friedoyster" },
    }); //target student name input and change value
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "SAVING...")); //wait for saving to disappear
    expect(getByText(container, "Hamlord Friedoyster"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    ); //getAll pulls array of everything with data-testid of day and then find looks for Monday in array.
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("cancels an interview and increases spots remaining by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING..."));
    await waitForElementToBeRemoved(() =>
      getByText(appointment, "DELETING...")
    );
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Hamlord Friedoyster" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "SAVING..."));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Hamlord Friedoyster" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElementToBeRemoved(() => getByText(appointment, "SAVING..."));
    expect(getByText(appointment, "Could not save.")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("");
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING..."));
    await waitForElementToBeRemoved(() =>
      getByText(appointment, "DELETING...")
    );
    expect(getByText(appointment, "Could not delete.")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
