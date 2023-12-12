import React from 'react';
import Header from './Header'; // Importing the Header component

const Layout = ({ children }) => {
  return (
    <div>
      <Header />  {/* Including the Header at the top */}
      <main className="container mx-auto p-4">
        {children}  {/* Main content of the page */}
      </main>
      <footer className="bg-gray-200 text-center text-sm p-4 absolute bottom-0 w-full">
        © {new Date().getFullYear()} My App
      </footer>
    </div>
  );
};

export default Layout;
