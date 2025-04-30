import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-amber-400" />
              <span className="ml-2 text-xl font-bold">DevShaala</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-700 transition">
              Home
            </Link>
            
            {!isAuthenticated() ? (
              <>
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
                    Sign In <span className="ml-1">▼</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                    <Link 
                      to="/user/signin" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign In as User
                    </Link>
                    <Link 
                      to="/admin/signin" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign In as Admin
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
                    Sign Up <span className="ml-1">▼</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                    <Link 
                      to="/user/signup" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign Up as User
                    </Link>
                    <Link 
                      to="/admin/signup" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign Up as Admin
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {isAdmin() && (
                  <Link 
                    to="/admin/dashboard" 
                    className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Dashboard
                  </Link>
                )}
                
                {isUser() && (
                  <Link 
                    to="/user/dashboard" 
                    className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    My Courses
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="px-3 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {!isAuthenticated() ? (
              <>
                <div className="block px-3 py-2 font-medium">Sign In</div>
                <Link
                  to="/user/signin"
                  className="block px-3 py-2 pl-6 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  As User
                </Link>
                <Link
                  to="/admin/signin"
                  className="block px-3 py-2 pl-6 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  As Admin
                </Link>
                
                <div className="block px-3 py-2 font-medium">Sign Up</div>
                <Link
                  to="/user/signup"
                  className="block px-3 py-2 pl-6 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  As User
                </Link>
                <Link
                  to="/admin/signup"
                  className="block px-3 py-2 pl-6 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  As Admin
                </Link>
              </>
            ) : (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                
                {isUser() && (
                  <Link
                    to="/user/dashboard"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Courses
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;