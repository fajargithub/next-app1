"use client";

import React from 'react';
import FeatherIcon from '../../../utils/FeatherIcons';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from "cookies-next";

const Nav = ({ children }) => {
    const pathname = usePathname();

    const routernav = useRouter();
    const handleLogout = () => {
        deleteCookie('token');
        routernav.push('/login');
    };

    if(pathname === "/login") {
        return(<body>
            <div className="flex-auto bg-gray-100">
                {children}
            </div>
        </body>);
    }
    else {
        return(
            <body className="flex">
              <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
                  <div className="p-4 text-xl font-bold">Admin Menu</div>
                  <nav className="flex-1">
                      <a href="#" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                          <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                      </a>
                      <a href="#" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                          <i className="fas fa-users mr-2"></i> Users
                      </a>
                      <a href="#" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                          <i className="fas fa-cogs mr-2"></i> Settings
                      </a>
                      <a href="#" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center">
                          <i className="fas fa-chart-line mr-2"></i> Reports
                      </a>
                      <a href="#" className="block py-2.5 px-4 hover:bg-gray-700 flex items-center" onClick={handleLogout}>
                        <FeatherIcon icon="Activity" className="w-5 h-5"/> &nbsp; Logout
                      </a>
                  </nav>
              </div>
              <div className="flex-1 p-6 bg-gray-100">
                  {children}
              </div>
          </body>
        );
    }
    
};

export default Nav;