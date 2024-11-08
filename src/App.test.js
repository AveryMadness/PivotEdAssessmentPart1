import React from "react";

import { render, screen, fireEvent, within } from "@testing-library/react";

import App from "./App";



describe("Task Management App", () => {

  test("renders Task List heading", () => {

    render(<App />);

    const headingElement = screen.getByText(/Task List/i);

    expect(headingElement).toBeInTheDocument();

  });



  test("adds a new task to the list", () => {

    render(<App />);



    // get input and button elements

    const inputElement = screen.getByPlaceholderText(/Enter a task/i);

    const addButton = screen.getByText(/Add/i);



    // add a task

    fireEvent.change(inputElement, { target: { value: "Test Task" } });

    fireEvent.click(addButton);



    // check if task is in the list

    const taskElement = screen.getByText("Test Task");

    expect(taskElement).toBeInTheDocument();

  });



  test("clears input field after adding a task", () => {

    render(<App />);



    const inputElement = screen.getByPlaceholderText(/Enter a task/i);

    const addButton = screen.getByText(/Add/i);



    fireEvent.change(inputElement, { target: { value: "Clear Test" } });

    fireEvent.click(addButton);



    expect(inputElement.value).toBe("");

  });



  test("deletes a task from the list", () => {

    render(<App />);



    const inputElement = screen.getByPlaceholderText(/Enter a task/i);

    const addButton = screen.getByText(/Add/i);



    // add a test task to delete

    fireEvent.change(inputElement, { target: { value: "Delete Test" } });

    fireEvent.click(addButton);



    // locate the task item containing the text

    const taskElement = screen.getByText("Delete Test").closest("li");

    // find the delete button within this specific task item

    const deleteButton = within(taskElement).getByText("Delete");



    // delete the task

    fireEvent.click(deleteButton);



    // verify the task has been removed from the document

    expect(screen.queryByText("Delete Test")).not.toBeInTheDocument();

  });

});
