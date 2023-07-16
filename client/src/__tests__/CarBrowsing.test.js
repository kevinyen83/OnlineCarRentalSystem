import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CarBrowsing from "../components/CarBrowsing";
import fetchMock from "jest-fetch-mock";



describe("CarBrowsing", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should add car to cart", async () => {
    const cars = [
      {
        id: 1,
        image: "https://images.hgmsites.net/lrg/2013-toyota-camry-4-door-sedan-i4-auto-xle-natl-angular-front-exterior-view_100414692_l.jpg",
        name: "Toyota Camry 2013",
        category: "SEDAN",
        subcategory: "5 SEATS",
        model: "Camry 2013",
        mileage: 85364,
        fuel_type: "Petrol",
        seats: 5,
        price_per_day: 240,
        availability: "Yes",
        description: "A reliable and spacious sedan with great fuel economy."
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(cars), { headers: { "Content-Type": "application/json" } });

    
    render(
      <div>
        <CarBrowsing
          setTotalPrice={jest.fn()}
          totalPrice={240}
          setCars={jest.fn()}
          filteredCars={cars}
          setFilteredCars={jest.fn()}
          cartItems={[]}
          setCartItems={jest.fn()}
          lastId={0}
          setLastId={jest.fn()}
          isCartEmpty={false}
          setIsCartEmpty={jest.fn()}
        />
      </div>
    );

    await waitFor(() => {
    const addToCartButton = screen.getByTestId("add-to-cart-btn");
    fireEvent.click(addToCartButton);
    
    const cartItemName = screen.getByTestId("cart-item-name");
    const cartItemImage = screen.getByTestId("cart-item-image");
    const cartItemCategory = screen.getByTestId("cart-item-category");
    const cartItemModel = screen.getByTestId("cart-item-model");
    const cartItemMileage = screen.getByTestId("cart-item-mileage");
    const cartItemFuelType = screen.getByTestId("cart-item-fuel_type");
    const cartItemSeats = screen.getByTestId("cart-item-seats");
    const cartItemPricePerDay = screen.getByTestId("cart-item-price_per_day");
    const cartItemAvailability = screen.getByTestId("cart-item-availability");
    const cartItemDescription = screen.getByTestId("cart-item-description");

    expect(cartItemName.textContent).toBe("Toyota Camry 2013");
    expect(cartItemImage.getAttribute("src")).toBe("https://images.hgmsites.net/lrg/2013-toyota-camry-4-door-sedan-i4-auto-xle-natl-angular-front-exterior-view_100414692_l.jpg");
    expect(cartItemCategory.textContent).toBe("Category: SEDAN");
    expect(cartItemModel.textContent).toBe("Model: Camry 2013");
    expect(cartItemMileage.textContent).toBe("Mileage: 85364 kms");
    expect(cartItemFuelType.textContent).toBe("Fuel Type: Petrol");
    expect(cartItemSeats.textContent).toBe("Seats: 5");
    expect(cartItemPricePerDay.textContent).toBe("Price Per Day: 240 AU");
    expect(cartItemAvailability.textContent).toBe("Availability: Yes");
    expect(cartItemDescription.textContent).toBe("Description: A reliable and spacious sedan with great fuel economy.");
    });
    });
});