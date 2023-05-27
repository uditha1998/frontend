import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import {
  AddCars,
  AddDestinations,
  AddFlight,
  AddHotel,
  AddPackage,
  CarAdmin,
  CarDetails,
  CarHome,
  CarsList,
  DestinationsAdmin,
  Details,
  EditCar,
  EditHotel,
  EditPackage,
  TravelMBooking,
  TravelMsAdmin,
  Home,
  HotelAdmin,
  HotelDetails,
  HotelHome,
  Hotels,
  PackageAdmin,
  PackageDetails,
  PackagesList,
  PackagesSearch,
  PackgesHome,
  Profile,
  PackageUser,
  SelectPackage,
  
} from "./pages";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="" element={<Home />} />
      <Route
        path="/destinations/:id"
        element={
          <SessionAuth>
            <Details />
          </SessionAuth>
        }
      />
      <Route
        path="/travel-m/:destination/:destinationId"
        element={
          <SessionAuth>
            <TravelMBooking />
          </SessionAuth>
        }
      />
      <Route
        path="/PackageDetails"
        element={
          <SessionAuth>
            <PackageDetails />
          </SessionAuth>
        }
      />
      
      <Route
        path="/hotels/home"
        element={
          <SessionAuth>
            <HotelHome />
          </SessionAuth>
        }
      />
      <Route
        path="/hotels"
        element={
          <SessionAuth>
            <Hotels />
          </SessionAuth>
        }
      />
      <Route
        path="/hotels/:id"
        element={
          <SessionAuth>
            <HotelDetails />
          </SessionAuth>
        }
      />
      <Route
        path="/cars/home"
        element={
          <SessionAuth>
            <CarHome />
          </SessionAuth>
        }
      />
      <Route
        path="/cars"
        element={
          <SessionAuth>
            <CarsList />
          </SessionAuth>
        }
      />
      <Route
        path="/cars/:id"
        element={
          <SessionAuth>
            <CarDetails />
          </SessionAuth>
        }
      />
      <Route
        path="/packages"
        element={
          <SessionAuth>
            <PackagesList />
          </SessionAuth>
        }
      />
      <Route
        path="/packages/home"
        element={
          <SessionAuth>
            <PackgesHome />
          </SessionAuth>
        }
      />
      <Route
        path="/packages/search/:destination"
        element={
          <SessionAuth>
            <PackagesSearch />
          </SessionAuth>
        }
      />
      <Route
        path="/packages/:id"
        element={
          <SessionAuth>
            <PackageDetails />
          </SessionAuth>
        }
      />

      <Route
        path="/user"
        element={
          <SessionAuth>
            <Profile />
          </SessionAuth>
        }
      />

      <Route
        path="/admin/destinations"
        element={
          <SessionAuth>
            <DestinationsAdmin />
          </SessionAuth>
        }
      />
      <Route
        path="/admin/destinations/new"
        element={
          <SessionAuth>
            <AddDestinations />
          </SessionAuth>
        }
      />
      <Route
        path="/admin/destinations/edit/:id"
        element={
          <SessionAuth>
            <AddDestinations />
          </SessionAuth>
        }
      />
      <Route path="/admin/hotels" element={<HotelAdmin />} />
      <Route path="/admin/flights" element={<TravelMsAdmin />} />
      <Route path="/admin/flights/new" element={<AddFlight />} />
      <Route path="/admin/flights/edit/:id" element={<AddFlight />} />
      <Route path="/admin/hotels/new" element={<AddHotel />} />
      <Route path="/admin/hotels/edit/:id" element={<EditHotel />} />
      <Route path="/admin/cars" element={<CarAdmin />} />
      <Route path="/admin/cars/new" element={<AddCars />} />
      <Route path="/admin/cars/edit/:id" element={<EditCar />} />
      <Route path="/admin/packages" element={<PackageAdmin />} />
      <Route path="/admin/packages/new" element={<AddPackage />} />
      <Route path="/user/packages" element={<PackageUser />} />
      <Route path="/user/packages/new/:id" element={<SelectPackage />} />
      <Route path="/admin/packages/edit/:id" element={<EditPackage />} />

      {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
    </AppRoutes>
  );
};

export default Routes;
