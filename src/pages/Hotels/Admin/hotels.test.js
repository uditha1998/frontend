import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosclient } from '../../../api';
import HotelDetails from '../HotelDetails';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock('../../../api', () => ({
  axiosclient: {
    get: jest.fn(),
    put: jest.fn()
  }
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

describe('HotelDetails Component', () => {
  const mockOneHotel = {
    hotelName: 'Test Hotel',
    price: '$100',
    imgUrl: 'http://example.com/hotel.jpg',
    place: 'Test Place',
    description: 'Test Description'
  };
  
  beforeEach(() => {
    useParams.mockReturnValue({ id: 'hotel123' });
    useNavigate.mockReturnValue(jest.fn());
    axiosclient.get.mockResolvedValue({ data: { hotel: mockOneHotel } });
  });

  it('should fetch hotel details and render the component', async () => {
    render(<HotelDetails />);
    
    expect(axiosclient.get).toHaveBeenCalledWith('/api/hotel/get/hotel123');
    
    await screen.findByText('Test Hotel');
    expect(screen.getByText('Test Hotel')).toBeInTheDocument();
    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call createPackageHotel and navigate when select button is clicked', async () => {
    axiosclient.put.mockResolvedValue({});
    
    render(<HotelDetails />);
    
    await screen.findByText('Select');
    
    fireEvent.click(screen.getByText('Select'));
    
    expect(axiosclient.put).toHaveBeenCalledWith('/api/packages/hotel/packageid', {
      name: 'Test Hotel',
      price: 100
    });
    
    expect(toast.success).toHaveBeenCalledWith('Hotel selected successfully!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });
    
    expect(useNavigate()).toHaveBeenCalledWith('/cars/home');
  });
  
  it('should handle createPackageHotel error and log the error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axiosclient.put.mockRejectedValue(new Error('Test error'));
    
    render(<HotelDetails />);
    
    await screen.findByText('Select');
    
    fireEvent.click(screen.getByText('Select'));
    
    expect(console.error).toHaveBeenCalledWith(new Error('Test error'));
    
    consoleErrorSpy.mockRestore();
  });
});
