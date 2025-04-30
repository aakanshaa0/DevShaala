import { useState, useEffect } from 'react';
import { getUserPurchases } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Book, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const UserDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useAuth();
  
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      if (!token) return;
      
      try {
        const response = await getUserPurchases(token);
        setPurchasedCourses(response.coursesData || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch your courses');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPurchasedCourses();
  }, [token]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and access all your purchased courses
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {purchasedCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Book className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No courses yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't purchased any courses yet. Explore our catalog to find courses that interest you.
            </p>
            <Link to="/">
              <Button variant="primary">Browse Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                  <div className="h-48 relative">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg font-medium">
                      Enrolled
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>12 hours</span>
                      <span className="mx-2">•</span>
                      <Award className="h-4 w-4 mr-1" />
                      <span>Certificate</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Purchased
                        </div>
                      </div>
                      
                      <Link 
                        to={`/course/${course._id}`} 
                        className="text-blue-600 font-medium hover:text-blue-800 transition"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;