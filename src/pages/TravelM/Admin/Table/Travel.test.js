import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axiosclient from "../../../../api";
import TravelMAdmin from "./TravelMAdmin";

jest.mock("../../../../api", () => ({
  axiosclient: {
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

// describe("TravelMAdmin", () => {
//   beforeEach(() => {
//     axiosclient.get.mockClear();
//     axiosclient.delete.mockClear();
//   });

  test("renders the component with travel methods", async () => {
    const flights = [
      {
        _id: "1",
        travelMeth: "Bus",
        from: "A",
        fromTime: "10:00 AM",
        to: "B",
        toTime: "12:00 PM",
        routNo: "123",
        price: 10,
      },
      {
        _id: "2",
        travelMeth: "Train",
        from: "C",
        fromTime: "11:00 AM",
        to: "D",
        toTime: "1:00 PM",
        routNo: "456",
        price: 20,
      },
    ];
    
 //   axiosclient.get.mockResolvedValue({ data: { flights } });

    render(<TravelMAdmin />);

    expect(axiosclient.get).toHaveBeenCalledWith("/api/flights");

    // Wait for the data to be loaded
    await screen.findByText("Bus");

    // Check if the travel methods are rendered
    expect(screen.getByText("Bus")).toBeInTheDocument();
    expect(screen.getByText("Train")).toBeInTheDocument();
  });

  test("deletes a travel method", async () => {
    const flights = [
      {
        _id: "1",
        travelMeth: "Bus",
        from: "A",
        fromTime: "10:00 AM",
        to: "B",
        toTime: "12:00 PM",
        routNo: "123",
        price: 10,
      },
    ];

    //axiosclient.get.mockResolvedValue({ data: { flights } });
    //axiosclient.delete.mockResolvedValue({ status: 204 });

    render(<TravelMAdmin />);

    // Wait for the data to be loaded
    await screen.findByText("Bus");

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(axiosclient.delete).toHaveBeenCalledWith("/api/flights/1");

    // Confirm deletion
    fireEvent.click(screen.getByText("Delete"));

    // Wait for the data to be reloaded
    await screen.findByText("Travel Method deleted successfully!");

    expect(screen.queryByText("Bus")).not.toBeInTheDocument();
  });
 
