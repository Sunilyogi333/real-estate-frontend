const Footer = () => {
    return (
        <footer className="bg-blue-50 text-gray-800 p-8">
        <div className="container mx-auto flex items-center p-3">
          {/* Left Section - Company Information (Width set to 30%) */}
          <div className="flex-shrink-0 w-1/3 sm:w-1/3 mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Serenity Properties</h1>
            <p className="text-sm">Your trusted partner in buying and selling properties.</p>
          </div>
  
          {/* Middle Section - Navigation Links (Centered) */}
          <nav className="flex-grow items-center w-1/2 sm:text-left  sm:w-1/3 mb-4 sm:mb-0 p-8 text-wrap">
            <a href="#" className="block text-gray-800 hover:text-blue-600 mr-4 mb-2 sm:inline-block sm:mb-0">Home</a>
            <a href="#" className="block text-gray-800 hover:text-blue-600 mr-4 mb-2 sm:inline-block sm:mb-0">Properties</a>
            <a href="#" className="block text-gray-800 hover:text-blue-600 mb-2 sm:inline-block sm:mb-0">Contact</a>
          </nav>
  
          {/* Right Section - Contact Information (Width set to 30%) */}
          <div className="flex-shrink-0 w-1/5 sm:absolute right-0 sm:w-1/3 text-wrap">
            <p className="text-sm mb-2">Contact us:</p>
            <p className="text-sm">Email: info@serenityproperties.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2024 Serenity Properties. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;