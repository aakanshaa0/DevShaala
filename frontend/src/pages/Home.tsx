import { useEffect, useState } from 'react';
import { getAllCourses } from '../services/courseService';
import CourseCard from '../components/common/CourseCard';
import { BookOpen, Code, Award, Users } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.courses || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch courses');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-6">
              Elevate Your Coding Skills
            </h1>
            <p className="text-xl mb-8">
              Premium coding courses designed by industry experts to help you master modern development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/">
                <Button variant="primary" size="large">
                  Browse Courses
                </Button>
              </Link>
              <Link to="/user/signup">
                <Button variant="outline" size="large" className="bg-transparent border-white text-blue-900 hover:border-blue-900">
                  Join DevShaala
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose DevShaala?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best learning experience for developers at all levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
              <p className="text-gray-600">
                Courses designed to take you from beginner to expert with practical examples.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Code className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Coding</h3>
              <p className="text-gray-600">
                Focus on practical skills with real-world projects and challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a community of learners and get help whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="mt-4 text-xl text-gray-600">
              Explore our most popular courses and start learning today.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              <p>Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 6).map((course) => (
                <CourseCard
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  description={course.description}
                  imageUrl={course.imageUrl}
                  price={course.price}
                />
              ))}
            </div>
          )}

          {courses.length > 6 && (
            <div className="text-center mt-12">
              <Link to="/">
                <Button variant="secondary">View All Courses</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students already learning with DevShaala and take your coding skills to the next level.
          </p>
          <Link to="/user/signup">
            <Button 
              variant="outline" 
              size="large" 
              className="bg-transparent border-white text-teal-700 hover:border-teal-700"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;