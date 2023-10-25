import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Axios from 'axios'; 
import CarBrowsing from '../components/CarBrowsing';

jest.mock('axios');
jest.setTimeout(10000);

const mockedResponse = {
  data: {
    cars: [
      {
        id: 1,
        name: 'Car 1',
        category: 'Category 1',
        model: 'Model 1',
        mileage: 10000,
        fuel_type: 'Petrol',
        seats: 5,
        price_per_day: 50,
        availability: 'Yes',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'Car 2',
        category: 'Category 2',
        model: 'Model 2',
        mileage: 20000,
        fuel_type: 'Diesel',
        seats: 7,
        price_per_day: 60,
        availability: 'No',
        description: 'Description 2',
      },
    ],
  },
};

Axios.get.mockResolvedValue(mockedResponse);

describe('CarBrowsing', () => {
    it('should render car cards with expected content', async () => {
        const setCarsMock = jest.fn();
        const setCartItems = jest.fn();
        const setTotalPrice = jest.fn();
        const setIsCartEmpty = jest.fn();
        const setLastId = jest.fn();
        const lastId = 0;
        const cartItems = [];
        const totalPrice = 0;
        const isCartEmpty = true;
        const filteredCars = mockedResponse.data.cars;
        const setFilteredCars = jest.fn();
  
    render(<CarBrowsing 
        setCars={setCarsMock} 
        lastId={lastId}
        setCartItems={setCartItems}
        cartItems={cartItems}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        setIsCartEmpty={setIsCartEmpty}
        setLastId={setLastId}
        cars={mockedResponse.data.cars}
        isCartEmpty={isCartEmpty}
        filteredCars={filteredCars}
        setFilteredCars={setFilteredCars}
    />);
    
        await waitFor(() => {
        const cartItemNameElements = screen.getAllByTestId('cart-item-name');
        expect(cartItemNameElements[0]).toHaveTextContent('Car 1');
        expect(cartItemNameElements[1]).toHaveTextContent('Car 2');

        const cartItemCategoryElements = screen.getAllByTestId('cart-item-category');
        expect(cartItemCategoryElements[0]).toHaveTextContent('Category 1');
        expect(cartItemCategoryElements[1]).toHaveTextContent('Category 2');
      
        const cartItemModelElements = screen.getAllByTestId('cart-item-model');
        expect(cartItemModelElements[0]).toHaveTextContent('Model 1');
        expect(cartItemModelElements[1]).toHaveTextContent('Model 2');
      
        const cartItemMileageElements = screen.getAllByTestId('cart-item-mileage');
        expect(cartItemMileageElements[0]).toHaveTextContent('Mileage: 10000 kms');
        expect(cartItemMileageElements[1]).toHaveTextContent('Mileage: 20000 kms');
      
        const cartItemFuelTypeElements = screen.getAllByTestId('cart-item-fuel_type');
        expect(cartItemFuelTypeElements[0]).toHaveTextContent('Fuel Type: Petrol');
        expect(cartItemFuelTypeElements[1]).toHaveTextContent('Fuel Type: Diesel');
      
        const cartItemSeatsElements = screen.getAllByTestId('cart-item-seats');
        expect(cartItemSeatsElements[0]).toHaveTextContent('Seats: 5');
        expect(cartItemSeatsElements[1]).toHaveTextContent('Seats: 7');
      
        const cartItemPricePerDayElements = screen.getAllByTestId('cart-item-price_per_day');
        expect(cartItemPricePerDayElements[0]).toHaveTextContent('Price Per Day: 50 AU');
        expect(cartItemPricePerDayElements[1]).toHaveTextContent('Price Per Day: 60 AU');
      
        const cartItemAvailabilityElements = screen.getAllByTestId('cart-item-availability');
        expect(cartItemAvailabilityElements[0]).toHaveTextContent('Availability: Yes');
        expect(cartItemAvailabilityElements[1]).toHaveTextContent('Availability: No');
      
        const cartItemDescriptionElements = screen.getAllByTestId('cart-item-description');
        expect(cartItemDescriptionElements[0]).toHaveTextContent('Description 1');
        expect(cartItemDescriptionElements[1]).toHaveTextContent('Description 2');
        }, { timeout: 5000 });

        expect(setCarsMock).toHaveBeenCalledWith(mockedResponse.data.cars);
});
});