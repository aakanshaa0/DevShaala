import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCourses, purchaseCourse } from '../services/courseService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Calendar, Clock, Award, CheckCircle } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  
  const { isAuthenticated, isUser, token } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getAllCourses();
        const foundCourse = response.courses.find((c: Course) => c._id === id);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch course details');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [id]);
  
  const handlePurchase = async () => {
    if (!isAuthenticated()) {
      toast.error('Please sign in to purchase this course');
      navigate('/user/signin');
      return;
    }
    
    if (!isUser()) {
      toast.error('Admin accounts cannot purchase courses');
      return;
    }
    
    if (!token || !id) return;
    
    setPurchasing(true);
    try {
      await purchaseCourse(id, token);
      toast.success('Course purchased successfully!');
      navigate('/user/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to purchase course');
      }
    } finally {
      setPurchasing(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: {error || 'Course not found'}</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-72 md:h-96 relative">
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <div className="flex items-center text-amber-400 mb-4">
                  <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Course</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{course.description}</p>
              
              <h3 className="text-xl font-bold mb-4 text-gray-900">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-2" />
                  <span className="text-gray-700">Modern development principles</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-2" />
                  <span className="text-gray-700">Hands-on practical examples</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-2" />
                  <span className="text-gray-700">Industry-standard best practices</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-2" />
                  <span className="text-gray-700">Real-world project experience</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Course Content</h2>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Module 1: Introduction</h3>
                    <span className="text-sm text-gray-500">3 lessons</span>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Module 2: Core Concepts</h3>
                    <span className="text-sm text-gray-500">5 lessons</span>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Module 3: Advanced Techniques</h3>
                    <span className="text-sm text-gray-500">4 lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">Created 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">12 hours of content</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Price</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ${course.price.toFixed(2)}
                </div>
              </div>
              
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handlePurchase}
                disabled={purchasing}
              >
                {purchasing ? 'Processing...' : 'Purchase Course'}
              </Button>
              
              {!isAuthenticated() && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Please <button onClick={() => navigate('/user/signin')} className="text-blue-600 hover:underline">sign in</button> to purchase this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;