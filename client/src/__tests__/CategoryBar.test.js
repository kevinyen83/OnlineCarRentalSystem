import React from "react";
import CategoryBar from "../components/CategoryBar";
import { render, fireEvent, screen } from "@testing-library/react";

describe("CategoryBar", () => {
  it("should filter cars based on category and subcategory", () => {
    const setFilteredCars = jest.fn();
    const cars = [
      {
        id: 1,
        image: "ChevroletCorvette.jpg",
        name: "Chevrolet Corvette",
        category: "SEDAN",
        subcategory: "2 SEATS"
      },
      {
        id: 2,
        image: "SubaruForester.jpg",
        name: "Subaru Forester",
        category: "SUV",
        subcategory: "5 SEATS"
      }
    ];

    render(
      <CategoryBar
        categoryList={[
          {
            categoryName: "SEDAN",
            subcategories: ["2 SEATS"]
          },
          {
            categoryName: "SUV",
            subcategories: ["5 SEATS"]
          }
        ]}
        setFilteredCars={setFilteredCars}
        cars={cars}
      />
    );

    fireEvent.click(screen.getByText("SEDAN"));
    fireEvent.click(screen.getByText("2 SEATS"));

    expect(setFilteredCars).toHaveBeenCalledWith([cars[0]]);
  });
});
