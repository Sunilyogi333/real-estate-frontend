import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-50 text-gray-800 p-8 mt-10">
          <div className="container mx-auto flex items-center p-3">
            {/* Left Section - Company Information (Width set to 30%) */}
            <div className="flex-shrink-0 w-1/3 sm:w-1/3 mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold">Serenity Properties</h1>
              <p className="text-sm">Your trusted partner in buying and selling properties.</p>
            </div>
    
            {/* Middle Section - Navigation Links (Centered) */}
            <div className="flex-grow text-center w-ful sm:text-left  sm:w-1/3 mb-4 sm:mb-0 p-20 text-wrap">
              <a href="#" className="block text-gray-800 hover:text-blue-600 mr-4 mb-2 sm:inline-block sm:mb-0">Home</a>
              <Link href="aboutus" className="block text-gray-800 hover:text-blue-600 mr-4 mb-2 sm:inline-block sm:mb-0">About Us</Link>
      
            </div>
    
            {/* Right Section - Contact Information (Width set to 30%) */}
            <div className="flex-shrink-0 w-1/5 sm:absolute right-0 sm:w-1/3 text-wrap">
              <p className="text-sm mb-2">Contact us:</p>
              <p className="text-sm">Email: sunilnath0109@gmail.com</p>
              <p className="text-sm">Phone: +977 9828569788</p>
              <br></br>
              <p className="text-sm">Email: pragyagyawali000@gmail.com</p>
              <p className="text-sm">Phone: +977 (078) XXXXX </p>
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