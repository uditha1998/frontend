import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TravelMBooking from "./TravelMBooking";

describe("TravelMBooking", () => {
  test("renders destination input", () => {
    render(
      <Router>
        <TravelMBooking />
      </Router>
    );

    const destinationInput = screen.getByPlaceholderText("Enter Destination");
    expect(destinationInput).toBeInTheDocument();
  });

  test("renders date input", () => {
    render(
      <Router>
        <TravelMBooking />
      </Router>
    );

    const dateInput = screen.getByPlaceholderText("Enter Date");
    expect(dateInput).toBeInTheDocument();
  });

  test("search button calls search function", () => {
    render(
      <Router>
        <TravelMBooking />
      </Router>
    );

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    // Add assertions for the expected behavior when the search button is clicked
    // For example, you can check if the search function is called and the expected state changes occur.
  });
});
