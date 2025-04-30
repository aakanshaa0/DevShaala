import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import UserSignup from './pages/user/UserSignup';
import UserSignin from './pages/user/UserSignin';
import UserDashboard from './pages/user/UserDashboard';
import AdminSignup from './pages/admin/AdminSignup';
import AdminSignin from './pages/admin/AdminSignin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseDetails from './pages/CourseDetails';
import CreateCourse from './pages/admin/CreateCourse';
import EditCourse from './pages/admin/EditCourse';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              
              {/* User Routes */}
              <Route path="/user/signup" element={<UserSignup />} />
              <Route path="/user/signin" element={<UserSignin />} />
              <Route 
                path="/user/dashboard" 
                element={
                  <ProtectedRoute userType="user">
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/admin/signin" element={<AdminSignin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/create-course" 
                element={
                  <ProtectedRoute userType="admin">
                    <CreateCourse />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/edit-course/:id" 
                element={
                  <ProtectedRoute userType="admin">
                    <EditCourse />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;