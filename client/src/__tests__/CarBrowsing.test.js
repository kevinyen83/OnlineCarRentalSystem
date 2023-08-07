import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarBrowsing from '../components/CarBrowsing';
import '@testing-library/jest-dom/extend-expect'; 
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();


describe('CarBrowsing', () => {
  it('should add a car to the cart on button click if it is available', async () => {
    const lastId = 0; 
    const setCartItems = jest.fn();
    const cartItems = []; 
    const setTotalPrice = jest.fn();
    const totalPrice = 0;
    const setIsCartEmpty = jest.fn();
    const setLastId = jest.fn();
    const isCartEmpty = jest.fn();
    const cars = [
        {
            id: 1,
            image: "https://images.hgmsites.net/lrg/2013-toyota-camry-4-door-sedan-i4-auto-xle-natl-angular-front-exterior-view_100414692_l.jpg",
            name: "Toyota Camry 2013",
            category: "SEDAN",
            subcategory: "5 SEATS",
            model: "Camry 2014",
            mileage: 85364,
            fuel_type: "Petrol",
            seats: 5,
            price_per_day: 240,
            availability: "Yes",
            description: "A reliable and spacious sedan with great fuel economy."
          },
    ];
    const setCars = jest.fn();
    const filteredCars = cars; 
    const setFilteredCars = jest.fn();

    fetchMock.mockResponseOnce(JSON.stringify({ cars }));
    

    render(
        <CarBrowsing 
            lastId={lastId}
            setCartItems={setCartItems}
            cartItems={cartItems}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
            setIsCartEmpty={setIsCartEmpty}
            setLastId={setLastId}
            isCartEmpty={isCartEmpty}
            cars={cars}
            setCars={setCars}
            filteredCars={filteredCars}
            setFilteredCars={setFilteredCars}
        />
    );

    await screen.findByText(/Add to Cart/i);

    const addToCartButton = screen.getAllByText(/Add to Cart/)[0];

    fireEvent.click(addToCartButton);

    expect(setCartItems).toHaveBeenCalledTimes(1);
    expect(setCartItems).toHaveBeenCalledWith(expect.any(Array)); 
    expect(setTotalPrice).toHaveBeenCalledTimes(1);
    expect(setTotalPrice).toHaveBeenCalledWith(expect.any(Number));
    expect(setCartItems).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: "Toyota Camry 2013",
            image: "https://images.hgmsites.net/lrg/2013-toyota-camry-4-door-sedan-i4-auto-xle-natl-angular-front-exterior-view_100414692_l.jpg",
            name: "Toyota Camry 2013",
            category: "SEDAN",
            subcategory: "5 SEATS",
            model: "Camry 2014",
            mileage: 85364,
            fuel_type: "Petrol",
            seats: 5,
            price_per_day: 240,
            availability: "Yes",
            description: "A reliable and spacious sedan with great fuel economy."
          }),
        ])
      );

    expect(screen.getByText(/Toyota Camry 2013/i)).toBeInTheDocument();
  });
});
