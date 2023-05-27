import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex items-start h-[calc(100vh-10.625rem)]">
      <aside className="w-1/5 h-full" aria-label="Sidebar">
        <div class="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
              <Link
                to="/admin/destinations"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="ml-3">Destinations</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/flights"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="ml-3">Bus / Train (Travel Method)</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/hotels"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="ml-3">Hotels</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/cars"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="ml-3">Cars</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/packages"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="ml-3">Packages</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <aside className="w-full h-full">{children}</aside>
    </div>
  );
};

export default AdminLayout;
